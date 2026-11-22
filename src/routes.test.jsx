import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import configureStore from './store'
import { changeField } from './redux/modules/wizard/slice'
import { GENERATOR_OFFLINE_MSG, SONG_NOT_FOUND_MSG } from './redux/modules/song/errors'
import { artificialSong, beyonce, mockFetch, renderApp, requestedUrls } from './test/utils'

afterEach(() => {
  vi.useRealTimers()
})

// A store already on the seed page, with an artist picked
function seedPageStore() {
  const store = configureStore()
  store.dispatch(changeField({ field: 'search', value: 'Beyonce Knowles' }))
  store.dispatch(changeField({ field: 'artistId', value: 1 }))
  return store
}

describe('routes', () => {
  it('renders the home page and pings the backend', () => {
    const fetchMock = mockFetch({ '/api/v1/general/ping': [200, 'pong!'] })
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/GENERATE/)
    expect(screen.getByRole('link', { name: 'TRY IT OUT' })).toHaveAttribute('href', '/artist')
    expect(requestedUrls(fetchMock)).toContain('/api/v1/general/ping')
  })

  it('redirects unknown routes to the home page', () => {
    mockFetch()
    renderApp('/does/not/exist')
    expect(screen.getByRole('link', { name: 'TRY IT OUT' })).toBeInTheDocument()
  })

  it('searches for an artist and picks it', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const fetchMock = mockFetch({
      '/api/v1/artists/random/16': [404, { message: 'No famous artists found' }],
      '/api/v1/artists/?page=1&per_page=2': [200, { items: [], total: 1 }],
      '/api/v1/artists/search/bey': [200, [beyonce]],
    })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const { store } = renderApp('/artist')

    // No cover artists in the database: the page copes with an empty list
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Pick an artist')
    expect(await screen.findByText('No artists to show yet')).toBeInTheDocument()
    expect(await screen.findByText('Searching in a database of 1 artist')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Search for an artist or a band'), 'bey')
    await act(async () => { vi.advanceTimersByTime(1000) })

    const tile = await screen.findByText('Beyonce Knowles')
    expect(requestedUrls(fetchMock)).toContain('/api/v1/artists/search/bey')

    await user.click(tile)
    expect(await screen.findByRole('heading', { level: 1, name: 'Create random lyrics like Beyonce Knowles' })).toBeInTheDocument()
    expect(screen.getByText('Beyonce Knowles')).toBeInTheDocument()
    expect(store.getState().wizard).toMatchObject({ search: 'Beyonce Knowles', artistId: 1 })
  })

  it('cancels a pending search when the list is refreshed', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const fetchMock = mockFetch({
      '/api/v1/artists/random/16': [200, [beyonce]],
      '/api/v1/artists/?page=1&per_page=2': [200, { items: [], total: 1 }],
      '/api/v1/artists/search/adel': [200, [{ ...beyonce, id: 2, name: 'adele', clean_name: 'Adele' }]],
    })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderApp('/artist')
    expect(await screen.findByText('Beyonce Knowles')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Search for an artist or a band')
    await user.type(input, 'adel')
    // The refresh control is the button right after the input
    expect(input.nextElementSibling).toBe(screen.getByRole('button', { name: 'Refresh list' }))
    await user.click(input.nextElementSibling)
    await act(async () => { vi.advanceTimersByTime(2000) })

    const backendCalls = requestedUrls(fetchMock).filter(url => url.startsWith('/api/v1/artists/'))
    expect(backendCalls.filter(url => url.includes('/search/'))).toEqual([])
    expect(backendCalls.filter(url => url.includes('/random/'))).toHaveLength(2)
    expect(await screen.findByText('Beyonce Knowles')).toBeInTheDocument()
    expect(screen.queryByText('Adele')).not.toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('shows the offline message when the generator answers 503', async () => {
    const generateUrl = '/api/v1/artificial_songs/generate/en/seed/never%20gonna%20give%20you%20up/words/100/artist/1/'
    const fetchMock = mockFetch({ [generateUrl]: [503, { message: 'ML models are not loaded' }] })
    const user = userEvent.setup()
    // Start on the seed page with an artist already picked
    const store = configureStore()
    store.dispatch(changeField({ field: 'search', value: 'Beyonce Knowles' }))
    store.dispatch(changeField({ field: 'artistId', value: 1 }))
    renderApp('/start-text', { store })
    await user.type(screen.getByPlaceholderText(/write at least 6 words/), 'never gonna give you up')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('link', { name: 'Generate' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(GENERATOR_OFFLINE_MSG)
    expect(requestedUrls(fetchMock)).toContain(generateUrl)
    expect(screen.queryByText('Baking lyrics...')).not.toBeInTheDocument()
  })

  it.each([
    ['ten spaces', '          '],
    ['only slashes', '//////////'],
  ])('rejects a seed of %s as required', async (_label, seed) => {
    const fetchMock = mockFetch()
    const user = userEvent.setup()
    renderApp('/start-text', { store: seedPageStore() })
    await user.type(screen.getByPlaceholderText(/write at least 6 words/), seed)
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('link', { name: 'Generate' }))

    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(requestedUrls(fetchMock).filter(url => url.includes('/generate/'))).toEqual([])
  })

  it('checks the minimum length on the seed as sent, not on padding or slashes', async () => {
    const fetchMock = mockFetch()
    const user = userEvent.setup()
    renderApp('/start-text', { store: seedPageStore() })
    await user.type(screen.getByPlaceholderText(/write at least 6 words/), '  a/b/c/d   ')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('link', { name: 'Generate' }))

    expect(screen.getByText('Must be 10 characters or more')).toBeInTheDocument()
    expect(requestedUrls(fetchMock).filter(url => url.includes('/generate/'))).toEqual([])
  })

  it('generates a song and shows it on its own page', async () => {
    const generateUrl = '/api/v1/artificial_songs/generate/en/seed/never%20gonna%20give%20you%20up/words/100/artist/1/'
    const fetchMock = mockFetch({
      [generateUrl]: [200, artificialSong],
      '/api/v1/artificial_songs/7': [200, artificialSong],
    })
    const user = userEvent.setup()
    renderApp('/start-text', { store: seedPageStore() })
    await user.type(screen.getByPlaceholderText(/write at least 6 words/), 'never gonna give you up')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('link', { name: 'Generate' }))

    expect(await screen.findByText('some generated lyrics')).toBeInTheDocument()
    expect(screen.getByText('ego remix (Artificial)')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Create random lyrics like/ })).not.toBeInTheDocument()
    expect(requestedUrls(fetchMock)).toContain(generateUrl)
    expect(localStorage.getItem('acceptedTandC')).toBe('true')
  })

  it('skips the terms checkbox once they were accepted', async () => {
    localStorage.setItem('acceptedTandC', 'true')
    const generateUrl = '/api/v1/artificial_songs/generate/en/seed/never%20gonna%20give%20you%20up/words/100/artist/1/'
    const fetchMock = mockFetch({ [generateUrl]: [503, { message: 'ML models are not loaded' }] })
    const user = userEvent.setup()
    renderApp('/start-text', { store: seedPageStore() })

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.queryByText(/I have read and accept/)).not.toBeInTheDocument()
    await user.type(screen.getByPlaceholderText(/write at least 6 words/), 'never gonna give you up')
    await user.click(screen.getByRole('link', { name: 'Generate' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(GENERATOR_OFFLINE_MSG)
    expect(requestedUrls(fetchMock)).toContain(generateUrl)
    expect(screen.queryByText('Required')).not.toBeInTheDocument()
  })

  it('shows a generated song', async () => {
    mockFetch({ '/api/v1/artificial_songs/7': [200, artificialSong] })
    renderApp('/song/7')
    expect(await screen.findByText('some generated lyrics')).toBeInTheDocument()
    expect(screen.getByText('ego remix (Artificial)')).toBeInTheDocument()
    expect(screen.getByText('Beyonce Knowles')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share on Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'One more time' })).toHaveAttribute('href', '/artist')
  })

  it('shows a friendly message for a missing song', async () => {
    mockFetch({ '/api/v1/artificial_songs/999': [404, { message: 'Lyric does not exist.' }] })
    renderApp('/song/999')
    expect(await screen.findByRole('alert')).toHaveTextContent(SONG_NOT_FOUND_MSG)
    expect(screen.getByRole('link', { name: 'One more time' })).toHaveAttribute('href', '/artist')
  })
})
