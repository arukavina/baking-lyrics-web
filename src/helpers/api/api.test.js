import { describe, expect, it, vi } from 'vitest'
import { jsonResponse, mockFetch, requestedUrls, beyonce } from '../../test/utils'
import { ApiError, apiGet, isGeneratorOffline, isNotFound } from './client'
import {
  artistDisplayName,
  artistImage,
  cleanSeed,
  generateSong,
  getArtistsTotal,
  getGeneratedSong,
  getRandomArtists,
  getStats,
  getVersion,
  getWikipediaImage,
  ping,
  searchArtists,
  trackShare,
} from '.'

describe('apiGet', () => {
  it('prefixes the default same-origin base url and returns the json body', async () => {
    const fetchMock = mockFetch({ '/api/v1/general/ping': [200, 'pong!'] })
    await expect(ping()).resolves.toBe('pong!')
    expect(fetchMock).toHaveBeenCalledWith('/api/v1/general/ping', expect.objectContaining({
      headers: { Accept: 'application/json' },
    }))
  })

  it('throws an ApiError with the backend message for non-2xx responses', async () => {
    mockFetch({ '/api/v1/x': [503, { message: 'ML models are not loaded' }] })
    const error = await apiGet('/x').catch(e => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(503)
    expect(error.message).toBe('ML models are not loaded')
    expect(error.body).toEqual({ message: 'ML models are not loaded' })
    expect(isGeneratorOffline(error)).toBe(true)
    expect(isNotFound(error)).toBe(false)
  })

  it('rejects a 2xx response whose body is not json (SPA fallback)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(200, undefined)))
    const error = await apiGet('/x').catch(e => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(200)
    expect(error.message).toBe('Unexpected response from the server')
    expect(error.body).toBeNull()
  })

  it.each([500, 502, 504])('treats an empty-body %i as backend unreachable', async (status) => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(status, undefined)))
    const error = await apiGet('/x').catch(e => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(0)
    expect(error.message).toBe('Network error: backend unreachable')
    expect(error.body).toBeNull()
  })

  it('keeps the status and message of a json 500 from the backend', async () => {
    mockFetch({ '/api/v1/x': [500, { message: 'boom' }] })
    const error = await apiGet('/x').catch(e => e)
    expect(error.status).toBe(500)
    expect(error.message).toBe('boom')
    expect(error.body).toEqual({ message: 'boom' })
  })

  it('keeps an empty-body 503 as generator offline', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(503, undefined)))
    const error = await apiGet('/x').catch(e => e)
    expect(error.status).toBe(503)
    expect(isGeneratorOffline(error)).toBe(true)
  })

  it('falls back to a generic message for a non-json (html) 404', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(404, undefined)))
    const error = await apiGet('/x').catch(e => e)
    expect(error.status).toBe(404)
    expect(error.message).toBe('HTTP 404')
    expect(error.body).toBeNull()
    expect(isNotFound(error)).toBe(true)
  })

  it('prefers the status text when there is one', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ...jsonResponse(404, undefined), statusText: 'Not Found' })))
    const error = await apiGet('/x').catch(e => e)
    expect(error.message).toBe('Not Found')
  })

  it('turns network failures into an ApiError with status 0', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch') }))
    const error = await apiGet('/x').catch(e => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(0)
  })
})

describe('artists', () => {
  it('reads the total from the paginated list (trailing slash)', async () => {
    const fetchMock = mockFetch({
      '/api/v1/artists/?page=1&per_page=2': [200, { items: [], page: 1, pages: 1, per_page: 2, total: 42 }],
    })
    await expect(getArtistsTotal()).resolves.toBe(42)
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/artists/?page=1&per_page=2'])
  })

  it('does not call the backend for searches under 3 characters', async () => {
    const fetchMock = mockFetch()
    await expect(searchArtists('be')).resolves.toEqual([])
    await expect(searchArtists('  b  ')).resolves.toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('searches on the clean name without replacing spaces or adding a slash', async () => {
    const fetchMock = mockFetch({ '/api/v1/artists/search/beyonce%20kn': [200, [beyonce]] })
    await expect(searchArtists(' beyonce kn ')).resolves.toEqual([beyonce])
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/artists/search/beyonce%20kn'])
  })

  it('strips slashes from the search and encodes the rest', async () => {
    const fetchMock = mockFetch()
    await searchArtists('AC/DC & co')
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/artists/search/ACDC%20%26%20co'])
  })

  it('maps a 404 search to an empty list but rethrows other errors', async () => {
    mockFetch({ '/api/v1/artists/search/zzz': [404, { message: 'Artist not found' }] })
    await expect(searchArtists('zzz')).resolves.toEqual([])

    mockFetch({ '/api/v1/artists/search/zzz': [500, { message: 'boom' }] })
    await expect(searchArtists('zzz')).rejects.toMatchObject({ status: 500 })
  })

  it('asks for 16 random artists by default and clamps n to 6..20', async () => {
    const fetchMock = mockFetch({ '/api/v1/artists/random/16': [200, [beyonce]] })
    await expect(getRandomArtists()).resolves.toEqual([beyonce])
    await getRandomArtists(2)
    await getRandomArtists(50)
    await getRandomArtists('nope')
    expect(requestedUrls(fetchMock)).toEqual([
      '/api/v1/artists/random/16',
      '/api/v1/artists/random/6',
      '/api/v1/artists/random/20',
      '/api/v1/artists/random/6',
    ])
  })

  it('maps "no cover artists" (404) to an empty list', async () => {
    mockFetch({ '/api/v1/artists/random/16': [404, { message: 'No famous artists found' }] })
    await expect(getRandomArtists()).resolves.toEqual([])
  })

  it('prefers clean_name for display', () => {
    expect(artistDisplayName(beyonce)).toBe('Beyonce Knowles')
    expect(artistDisplayName({ name: 'led-zeppelin' })).toBe('led zeppelin')
    expect(artistDisplayName(undefined)).toBe('')
  })
})

describe('songs', () => {
  it('uses the seeded route with a trailing slash', async () => {
    const fetchMock = mockFetch()
    await generateSong({ artistId: 1, seed: ' hello world ', numberWords: 100 }).catch(() => {})
    expect(requestedUrls(fetchMock)).toEqual([
      '/api/v1/artificial_songs/generate/en/seed/hello%20world/words/100/artist/1/',
    ])
  })

  it('replaces slashes in the seed and keeps newlines', async () => {
    const fetchMock = mockFetch()
    await generateSong({ artistId: '3', seed: 'up/down\\left\nright' }).catch(() => {})
    expect(requestedUrls(fetchMock)).toEqual([
      '/api/v1/artificial_songs/generate/en/seed/up%20down%20left%0Aright/words/100/artist/3/',
    ])
  })

  it('cleans the seed as it is sent', () => {
    expect(cleanSeed(' up/down\\left ')).toBe('up down left')
    expect(cleanSeed('//////////')).toBe('')
    expect(cleanSeed('          ')).toBe('')
    expect(cleanSeed(undefined)).toBe('')
  })

  it('uses the no-seed route when the seed is blank', async () => {
    const fetchMock = mockFetch()
    await generateSong({ artistId: 1, seed: ' / ', numberWords: 0 }).catch(() => {})
    expect(requestedUrls(fetchMock)).toEqual([
      '/api/v1/artificial_songs/generate/en/words/1/artist/1/',
    ])
  })

  it('returns the generated song and surfaces 503 as generator offline', async () => {
    const url = '/api/v1/artificial_songs/generate/en/seed/some%20words/words/100/artist/1/'
    mockFetch({ [url]: [200, { id: 7 }] })
    await expect(generateSong({ artistId: 1, seed: 'some words' })).resolves.toEqual({ id: 7 })

    mockFetch({ [url]: [503, { message: 'ML models are not loaded' }] })
    const error = await generateSong({ artistId: 1, seed: 'some words' }).catch(e => e)
    expect(isGeneratorOffline(error)).toBe(true)
  })

  it('rejects without a request when there is no artist', async () => {
    const fetchMock = mockFetch()
    await expect(generateSong({ seed: 'x' })).rejects.toMatchObject({ status: 400 })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('gets a generated song by id without a trailing slash', async () => {
    const fetchMock = mockFetch({ '/api/v1/artificial_songs/999': [404, { message: 'Lyric does not exist.' }] })
    const error = await getGeneratedSong(999).catch(e => e)
    expect(isNotFound(error)).toBe(true)
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/artificial_songs/999'])
  })
})

describe('getWikipediaImage', () => {
  // Answers Wikipedia queries: `titles` lookups from `pages` (by title, with optional
  // normalized/redirects lists) and searches from `search` (pages in ranking order)
  const wikipedia = ({ pages = {}, normalized = [], redirects = [], search = [] } = {}) => {
    const fetchMock = vi.fn(async (href) => {
      const params = new URL(href).searchParams
      if (params.get('generator') === 'search') {
        const found = Object.fromEntries(search.map((page, index) => [index, { ...page, index: index + 1 }]))
        return jsonResponse(200, { query: { pages: found } })
      }
      const asked = params.get('titles').split('|')
      const resolved = asked.map(title => {
        const rename = [...normalized, ...redirects].find(r => r.from === title)
        return rename ? rename.to : title
      })
      const found = Object.fromEntries(resolved.map((title, i) =>
        [i, pages[title] ? { title, ...pages[title] } : { title, missing: '' }]))
      return jsonResponse(200, { query: { normalized, redirects, pages: found } })
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
  }
  const band = (description, source) => ({ description, thumbnail: { source } })

  it('skips a page that is not about music and takes the band page', async () => {
    const fetchMock = wikipedia({ pages: {
      Scorpions: band('Order of arachnids', 'https://img/arachnid.jpg'),
      'Scorpions (band)': band('German rock band', 'https://img/scorpions.jpg'),
    } })
    await expect(getWikipediaImage('Scorpions')).resolves.toBe('https://img/scorpions.jpg')
    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.origin).toBe('https://en.wikipedia.org')
    expect(url.searchParams.get('titles')).toBe(
      'Scorpions|Scorpions (band)|Scorpions (musician)|Scorpions (singer)|Scorpions (rapper)|Scorpions (group)')
    expect(url.searchParams.get('origin')).toBe('*')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('prefers the plain title when it is the music page', async () => {
    wikipedia({ pages: {
      Madonna: band('American singer-songwriter (born 1958)', 'https://img/madonna.jpg'),
      'Madonna (band)': band('Rock band', 'https://img/other.jpg'),
    } })
    await expect(getWikipediaImage('Madonna')).resolves.toBe('https://img/madonna.jpg')
  })

  it('follows normalized titles and redirects', async () => {
    wikipedia({
      redirects: [{ from: 'Hank Williams Jr', to: 'Hank Williams Jr.' }],
      pages: { 'Hank Williams Jr.': band('American singer-songwriter and musician', 'https://img/hank.jpg') },
    })
    await expect(getWikipediaImage('Hank Williams Jr')).resolves.toBe('https://img/hank.jpg')
  })

  it('falls back to the best ranked music page of a search', async () => {
    const fetchMock = wikipedia({ search: [
      { title: 'Direct current', description: 'Electric current' },
      { title: 'AC/DC', ...band('Australian rock band', 'https://img/acdc.jpg') },
    ] })
    await expect(getWikipediaImage('Ac Dc')).resolves.toBe('https://img/acdc.jpg')
    expect(new URL(fetchMock.mock.calls[1][0]).searchParams.get('gsrsearch')).toBe('Ac Dc')
  })

  it('resolves to undefined when no music page is found', async () => {
    wikipedia({ pages: { Alabama: band('State of the United States', 'https://img/state.jpg') } })
    await expect(getWikipediaImage('Alabama')).resolves.toBeUndefined()
  })

  it('looks each name up once', async () => {
    const fetchMock = wikipedia({ pages: { Eels: band('American indie rock band', 'https://img/eels.jpg') } })
    await getWikipediaImage('Eels')
    await expect(getWikipediaImage('Eels')).resolves.toBe('https://img/eels.jpg')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('resolves to undefined when the lookup fails, and tries again next time', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline') }))
    await expect(getWikipediaImage('x')).resolves.toBeUndefined()
    await expect(getWikipediaImage('')).resolves.toBeUndefined()
    const fetchMock = wikipedia({ pages: { x: band('Pop duo', 'https://img/x.jpg') } })
    await expect(getWikipediaImage('x')).resolves.toBe('https://img/x.jpg')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('artistImage', () => {
  it('uses the catalog picture when the artist page is known, without asking Wikipedia', async () => {
    const fetchMock = mockFetch()
    await expect(artistImage({ clean_name: 'Queen', wiki_title: 'Queen (band)', image_url: 'https://img/q.jpg' }))
      .resolves.toBe('https://img/q.jpg')
    await expect(artistImage({ clean_name: '112', wiki_title: '112 (band)', image_url: null })).resolves.toBeUndefined()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('looks the display name up when the catalog has no page', async () => {
    const fetchMock = mockFetch()
    await expect(artistImage({ clean_name: 'Some Band', wiki_title: null })).resolves.toBeUndefined()
    expect(new URL(requestedUrls(fetchMock)[0]).searchParams.get('titles')).toMatch(/^Some Band\|Some Band \(band\)/)
  })
})

describe('getVersion', () => {
  it('resolves to the backend build info', async () => {
    const build = { version: '0.5.0', commit: 'abc1234', date: '2026-11-22T12:00:00+00:00' }
    const fetchMock = mockFetch({ '/api/v1/general/version': [200, build] })
    await expect(getVersion()).resolves.toEqual(build)
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/general/version'])
  })

  it('resolves to null when the backend has no version endpoint or is down', async () => {
    mockFetch({ '/api/v1/general/version': [404, { message: 'Not Found' }] })
    await expect(getVersion()).resolves.toBeNull()
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    await expect(getVersion()).resolves.toBeNull()
  })
})

describe('getStats', () => {
  it('resolves to the site stats', async () => {
    const stats = { artists: 1, songs_generated: 12, shares: 3, top_artists: [{ id: 1, name: 'Beyonce Knowles', songs_generated: 12 }] }
    const fetchMock = mockFetch({ '/api/v1/general/stats': [200, stats] })
    await expect(getStats()).resolves.toEqual(stats)
    expect(requestedUrls(fetchMock)).toEqual(['/api/v1/general/stats'])
  })

  it('resolves to null when the backend has no stats endpoint or is down', async () => {
    mockFetch()
    await expect(getStats()).resolves.toBeNull()
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    await expect(getStats()).resolves.toBeNull()
  })
})

describe('trackShare', () => {
  it('posts the network as json to the song shares endpoint', async () => {
    const fetchMock = mockFetch({
      '/api/v1/artificial_songs/7/shares': [201, { artificial_song_id: 7, network: 'whatsapp', shares: 4 }],
    })
    await expect(trackShare(7, 'whatsapp')).resolves.toBeUndefined()
    expect(fetchMock).toHaveBeenCalledWith('/api/v1/artificial_songs/7/shares', expect.objectContaining({
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ network: 'whatsapp' }),
    }))
  })

  it('never rejects, whatever the backend answers', async () => {
    mockFetch({ '/api/v1/artificial_songs/999/shares': [404, { message: 'Lyric does not exist.' }] })
    await expect(trackShare(999, 'facebook')).resolves.toBeUndefined()
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    await expect(trackShare(7, 'twitter')).resolves.toBeUndefined()
  })
})
