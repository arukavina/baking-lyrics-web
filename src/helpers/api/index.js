// Public surface of the backend API. Every function resolves to the parsed
// JSON body and rejects with an ApiError (see ./client).
import { ApiError, apiGet, isNotFound } from './client'

export { ApiError, isNotFound, isGeneratorOffline, API_URL } from './client'
export { getWikipediaImage } from './wikipedia'

export const MIN_SEARCH_LENGTH = 3
export const RANDOM_MIN = 6
export const RANDOM_MAX = 20

/**
 * @typedef {{id: number, name: string, clean_name: string, cover: boolean,
 *   country: string, formation_date: string|null, genre: string|null}} Artist
 * @typedef {{id: number, artificial_title: {id: number, title: string, creation_date: string},
 *   lyrics: string, model: string, creation_date: string, user: object,
 *   base_artist: Artist}} ArtificialSong
 */

// Human readable artist name: `name` is a slug, `clean_name` the display name.
export const artistDisplayName = artist =>
  artist?.clean_name || (artist?.name ? artist.name.replace(/-/g, ' ') : '')

/** GET /general/ping, resolves to "pong!" */
export const ping = () => apiGet('/general/ping')

/** GET /artists/ (trailing slash on purpose: no slash gets a 308 redirect) */
export const listArtists = ({ page = 1, perPage = 10 } = {}) =>
  apiGet('/artists/', { query: { page, per_page: perPage } })

/** @returns {Promise<number>} */
export const getArtistsTotal = () =>
  listArtists({ perPage: 2 }).then(result => result.total)

/** @returns {Promise<Artist>} */
export const getArtist = id => apiGet(`/artists/${encodeURIComponent(id)}`)

/**
 * Case-insensitive match on clean_name (which has spaces, not dashes).
 * The backend answers 404 when nothing matches, which is an empty result here.
 * @returns {Promise<Artist[]>}
 */
export async function searchArtists(query = '') {
  const q = query.replace(/\//g, '').trim()
  if (q.length < MIN_SEARCH_LENGTH) return []
  try {
    return await apiGet(`/artists/search/${encodeURIComponent(q)}`)
  } catch (e) {
    if (isNotFound(e)) return []
    throw e
  }
}

/**
 * Random front page artists. n is clamped to the backend range 6..20, and the
 * 404 the backend sends when there are no cover artists is an empty result.
 * @returns {Promise<Artist[]>}
 */
export async function getRandomArtists(n = 16) {
  const count = Math.min(RANDOM_MAX, Math.max(RANDOM_MIN, Math.trunc(Number(n)) || RANDOM_MIN))
  try {
    return await apiGet(`/artists/random/${count}`)
  } catch (e) {
    if (isNotFound(e)) return []
    throw e
  }
}

/**
 * The seed as it is sent to the backend: slashes (which the backend routes on)
 * become spaces and the ends are trimmed. Empty means the no-seed route.
 * @returns {string}
 */
export const cleanSeed = seed => String(seed ?? '').replace(/[/\\]/g, ' ').trim()

/**
 * Generates a song. Uses the seeded route when a seed is given, otherwise the
 * no-seed route. The seed cannot contain "/" (the backend routes on it).
 * Rejects with ApiError: 503 generator offline, 400/404 artist unusable,
 * 500 generator error.
 * @returns {Promise<ArtificialSong>}
 */
export function generateSong({ artistId, seed = '', numberWords = 100, lang = 'en' } = {}) {
  const id = Number(artistId)
  if (!Number.isInteger(id)) {
    return Promise.reject(new ApiError(400, 'An artist is required.', null))
  }
  const words = Math.max(1, Math.trunc(Number(numberWords)) || 1)
  const sentSeed = cleanSeed(seed)
  const base = `/artificial_songs/generate/${encodeURIComponent(lang)}`
  const tail = `/words/${words}/artist/${id}/`
  return sentSeed
    ? apiGet(`${base}/seed/${encodeURIComponent(sentSeed)}${tail}`)
    : apiGet(`${base}${tail}`)
}

/** @returns {Promise<ArtificialSong>} 404 ApiError when the song does not exist */
export const getGeneratedSong = id => apiGet(`/artificial_songs/${encodeURIComponent(id)}`)
