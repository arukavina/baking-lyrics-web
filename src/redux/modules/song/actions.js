import {
	GET_SONG_FULFILLED,
	GET_SONG_PENDING,
	GET_SONG_REJECTED,
} from './const'
import { 
  getSong as getSongApi,
  getGeneratedSong as getGeneratedSongApi,
 } from '../../../helpers/api/song'

export const generateSong = (seed, numberWords, artistId) => (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  return getSongApi(seed, numberWords, artistId)
    .then((data) => {
      dispatch({
        type: GET_SONG_FULFILLED,
        payload: data.data
      })
    })
    .catch((e) => {
      dispatch({
        type: GET_SONG_REJECTED,
        payload: {
          errorMsg: `Failed trying to get a song ${e}`
        }
      })
    })
}

export const getGeneratedSong = (seed, numberWords, artistId) => (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  return getGeneratedSongApi(seed, numberWords, artistId)
    .then((data) => {
      dispatch({
        type: GET_SONG_FULFILLED,
        payload: data.data
      })
    })
    .catch((e) => {
      dispatch({
        type: GET_SONG_REJECTED,
        payload: {
          errorMsg: `Failed trying to get a song ${e}`
        }
      })
    })
}