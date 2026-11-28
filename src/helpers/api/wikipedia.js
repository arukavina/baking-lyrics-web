// External lookup of an artist picture, kept apart from the backend client.
// `origin=*` makes the Wikipedia API answer with CORS headers.
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'

// Many artist names are also common words (Scorpions, Alabama, Queen), so a page only counts when its
// short description is about music, e.g. "German rock band" or "American rapper (born 1988)".
const MUSIC_DESCRIPTION =
  /\b(bands?|singers?|rappers?|musicians?|music|musical|groups?|duo|trio|songwriters?|composers?|vocalists?|guitarists?|pianists?|dj|record producers?|entertainers?|orchestra|choir|ensemble|hip hop|rock|pop|country|jazz|metal|punk|soul|r&b|reggae|blues|folk)\b/i

// Disambiguated titles tried after the plain name, in this order
const TITLE_SUFFIXES = ['', ' (band)', ' (musician)', ' (singer)', ' (rapper)', ' (group)']

const THUMBNAIL_WIDTH = '640'

// title -> Promise of the image URL; one lookup per artist and page load
const cache = new Map()

export const isMusicPage = page => MUSIC_DESCRIPTION.test(page?.description ?? '')

async function query(params) {
  const search = new URLSearchParams({
    action: 'query',
    prop: 'pageimages|description',
    piprop: 'thumbnail',
    pithumbsize: THUMBNAIL_WIDTH,
    origin: '*',
    redirects: '1',
    format: 'json',
    ...params,
  })
  const res = await fetch(`${WIKIPEDIA_API}?${search}`)
  if (!res.ok) throw new Error(`Wikipedia answered ${res.status}`)
  return (await res.json())?.query ?? {}
}

// The music page among the exact title and its disambiguated variants, in TITLE_SUFFIXES order
async function byTitle(name) {
  const titles = TITLE_SUFFIXES.map(suffix => `${name}${suffix}`)
  const result = await query({ titles: titles.join('|') })
  const renamed = new Map([...(result.normalized ?? []), ...(result.redirects ?? [])].map(r => [r.from, r.to]))
  const resolve = title => {
    let current = title
    while (renamed.has(current)) current = renamed.get(current)
    return current
  }
  const pages = new Map(Object.values(result.pages ?? {}).filter(p => !('missing' in p)).map(p => [p.title, p]))
  return titles.map(title => pages.get(resolve(title))).find(isMusicPage)
}

// The best ranked music page of a full text search (e.g. "Ac Dc" finds "AC/DC")
async function bySearch(name) {
  const result = await query({ generator: 'search', gsrsearch: name, gsrlimit: '5' })
  return Object.values(result.pages ?? {})
    .sort((a, b) => a.index - b.index)
    .find(isMusicPage)
}

async function lookup(name) {
  const page = (await byTitle(name)) ?? (await bySearch(name))
  return page?.thumbnail?.source
}

// Resolves to the artist's image URL, or undefined when there is no music page with an image or the
// lookup fails. Failed lookups are not cached, so a later visit can try again.
export function getWikipediaImage(name) {
  const key = name?.trim()
  if (!key) return Promise.resolve(undefined)
  if (!cache.has(key)) {
    cache.set(key, lookup(key).catch(() => {
      cache.delete(key)
      return undefined
    }))
  }
  return cache.get(key)
}

// Tests only
export const clearWikipediaCache = () => cache.clear()
