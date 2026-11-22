import {
  GET_SONG_FULFILLED,
  GET_SONG_PENDING,
  GET_SONG_REJECTED,
  CLEAR_SONG,
} from './const'
import {
  artistDisplayName,
  generateSong as generateSongApi,
  getGeneratedSong as getGeneratedSongApi,
  getWikipediaImage,
} from '../../../helpers/api'
import { generateErrorMessage, getSongErrorMessage } from './errors'

const statusOf = e => (typeof e?.status === 'number' ? e.status : null)

export const generateSong = ({ artistId, seed, numberWords = 100 }) => async (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  try {
    const song = await generateSongApi({ artistId, seed, numberWords })
    dispatch({
      type: GET_SONG_FULFILLED,
      payload: song
    })
  }
  catch (e) {
    const status = statusOf(e)
    dispatch({
      type: GET_SONG_REJECTED,
      payload: {
        errorMsg: generateErrorMessage(status),
        status
      }
    })
  }
}

export const getGeneratedSong = (songId) => async (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  try {
    const song = await getGeneratedSongApi(songId)
    const coverImg = await getWikipediaImage(artistDisplayName(song.base_artist))
    dispatch({
      type: GET_SONG_FULFILLED,
      payload: {
        ...song,
        coverImg
      }
    })
  }
  catch (e) {
    const status = statusOf(e)
    dispatch({
      type: GET_SONG_REJECTED,
      payload: {
        errorMsg: getSongErrorMessage(status),
        status
      }
    })
  }
}

export const clearSong = () => dispatch => {
  return dispatch({
    type: CLEAR_SONG
  })
}
