import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
  SET_ARTISTS_TOTAL,
} from './const'
import {
  MIN_SEARCH_LENGTH,
  artistDisplayName,
  getArtistsTotal as getArtistsTotalApi,
  getRandomArtists,
  getWikipediaImage,
  searchArtists,
} from '../../../helpers/api'

export const RANDOM_ARTISTS_COUNT = 16
export const ARTISTS_ERROR_MSG = 'We could not load artists right now. Please try again later.'

// Only the latest request may update the list (a slow search must not
// overwrite the result of a newer one).
let latestRequest = 0

// Searches when the filter has at least MIN_SEARCH_LENGTH characters,
// otherwise loads random cover artists. Only one backend call per load.
export const getArtists = (filter = '') => async (dispatch) => {
  const query = filter.trim()
  const requestId = ++latestRequest
  dispatch({ type: GET_ARTISTS_PENDING })
  let list
  try {
    list = query.length >= MIN_SEARCH_LENGTH
      ? await searchArtists(query)
      : await getRandomArtists(RANDOM_ARTISTS_COUNT)
  } catch (e) {
    if (requestId !== latestRequest) return
    dispatch({
      type: GET_ARTISTS_REJECTED,
      payload: {
        errorMsg: ARTISTS_ERROR_MSG,
        status: typeof e?.status === 'number' ? e.status : null,
      },
    })
    return
  }
  if (requestId !== latestRequest) return
  dispatch({ type: GET_ARTISTS_FULFILLED, payload: { list } })

  // Cover images are a best effort lookup; failures leave the tile without one.
  // Wikipedia resolves the display name (clean_name) far better than the slug.
  list.forEach(async (item) => {
    const coverImg = await getWikipediaImage(artistDisplayName(item))
    if (coverImg) {
      dispatch({ type: SAVE_COVER_IMAGE, payload: { id: item.id, coverImg } })
    }
  })
}

// Size of the artist database, shown under the search bar. Loaded once;
// a failure only hides the counter.
export const getArtistsTotal = () => async (dispatch) => {
  try {
    const total = await getArtistsTotalApi()
    dispatch({ type: SET_ARTISTS_TOTAL, payload: { total } })
  } catch {
    // ignored on purpose
  }
}
