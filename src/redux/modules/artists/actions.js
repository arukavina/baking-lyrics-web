import get from "lodash/get"
import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
} from './const'
import { getArtistsData } from '../../../helpers/api/artists'


export const getArtists = (filter = '') => async (dispatch) => {
  dispatch({
    type: GET_ARTISTS_PENDING
  })
  try {
    const artists = await getArtistsData(filter.replace(' ', '-'))
    const artistList = filter ? artists.data : artists.data.items
    const newList = artistList.forEach(async (item) => {
      const name = item.name.replace(/\-/g, '%20')
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=*&redirects=1&format=json&piprop=original&titles=${name}`, { "Content-Type": "application/json charset=UTF-8" })
      const json = await res.json()
      const firstElement = Object.keys(json.query.pages)[0]
      const coverImg = get(json.query.pages[firstElement], 'original.source')
      dispatch({
        type: SAVE_COVER_IMAGE,
        payload: {
          ...item,
          name: item.name.replace(/\-/g, ' '),
          coverImg,
        }
      })
      return {
        ...item,
        name: item.name.replace(/\-/g, ' ')
      }
    })
    if (filter) {
      dispatch({
        type: GET_ARTISTS_FULFILLED,
        payload: {artistList}
      })
    }
    else {
      dispatch({
        type: GET_ARTISTS_FULFILLED,
        payload: {artistList, total: artists.data.total}
      })
    }
  }
  catch (e) {
    dispatch({
      type: GET_ARTISTS_REJECTED,
      payload: {
        errorMsg: `Failed trying to get artists ${e}`
      }
    })
  }
}
