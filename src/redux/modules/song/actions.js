import {
	GET_SONG_FULFILLED,
	GET_SONG_PENDING,
  GET_SONG_REJECTED,
  CLEAR_SONG,
} from './const'
import { 
  getSong as getSongApi,
  getGeneratedSong as getGeneratedSongApi,
 } from '../../../helpers/api/song'

export const generateSong = (seed, numberWords, artistId) => async (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  try {
    const data = await getSongApi(seed, numberWords, artistId)
    dispatch({
      type: GET_SONG_FULFILLED,
      payload: data.data
    })
  }
  catch (e) {
    dispatch({
      type: GET_SONG_REJECTED,
      payload: {
        errorMsg: `Failed trying to get a song ${e}`
      }
    })
  }
}

export const getGeneratedSong = (seed, numberWords, artistId) => async (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  try {
    const data = await getGeneratedSongApi(seed, numberWords, artistId)
    dispatch({
      type: GET_SONG_FULFILLED,
      payload: data.data
    })
  }
  catch (e) {
    dispatch({
      type: GET_SONG_REJECTED,
      payload: {
        errorMsg: `Failed trying to get a song ${e}`
      }
    })
  }
}

export const clearSong = () => dispatch => {
  return dispatch({
    type: CLEAR_SONG
  })
}