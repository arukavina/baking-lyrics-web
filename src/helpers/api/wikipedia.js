// External lookup of an artist picture, kept apart from the backend client.
// `origin=*` makes the Wikipedia API answer with CORS headers.
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'

// Resolves to the image URL, or undefined when there is none or the lookup fails.
export async function getWikipediaImage(title) {
  if (!title) return undefined
  const params = new URLSearchParams({
    action: 'query',
    prop: 'pageimages',
    origin: '*',
    redirects: '1',
    format: 'json',
    piprop: 'original',
    titles: title,
  })
  try {
    const res = await fetch(`${WIKIPEDIA_API}?${params}`)
    if (!res.ok) return undefined
    const json = await res.json()
    const pages = json?.query?.pages ?? {}
    const first = Object.values(pages)[0]
    return first?.original?.source
  } catch {
    return undefined
  }
}
