import get from "lodash/get"
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

export const getGeneratedSong = (songId) => async (dispatch) => {
  dispatch({
    type: GET_SONG_PENDING
  })
  try {
    const data = await getGeneratedSongApi(songId)
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=*&redirects=1&format=json&piprop=original&titles=${data.data.base_artist.name.replace(/\-/g, '%20')}`, { "Content-Type": "application/json charset=UTF-8" })
    const json = await res.json()
    const firstElement = Object.keys(json.query.pages)[0]
    const coverImg = get(json.query.pages[firstElement], 'original.source')
    dispatch({
      type: GET_SONG_FULFILLED,
      payload: {
        ...data.data,
        coverImg
      }
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