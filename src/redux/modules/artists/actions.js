import get from "lodash/get";
import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
} from './const'
// Get
import { getArtistsDataMock } from '../../../helpers/api/artists'
// import {
//   getAppInstanceData,
//   putAppInstanceItem,
//   delAAppInstanceItem,
//   postAppInstanceItem,
// } from '../../../helpers/api/appinstance'


export const getArtists = () => (dispatch) => {
  dispatch({
    type: GET_ARTISTS_PENDING
  })
  return getArtistsDataMock()
    .then((artists) => {
      artists.data.forEach(item => {
        const name = item.name.replace(' ', '%20')
        return fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=*&format=json&piprop=original&titles=${name}`, { "Content-Type": "application/json; charset=UTF-8" })
          .then(res => res.json())
          .then(json => {
            const firstElement = Object.keys(json.query.pages)[0]
            const coverImg = get(json.query.pages[firstElement], 'original.source')
            
            dispatch({
              type: SAVE_COVER_IMAGE,
              payload: {
                ...item,
                coverImg
              }
            })
          })
        })
      dispatch({
        type: GET_ARTISTS_FULFILLED,
        payload: artists.data
      })
    })
    .catch((e) => {
      dispatch({
        type: GET_ARTISTS_REJECTED,
        payload: {
          errorMsg: `Failed trying to get artists ${e.error}`
        }
      })
    })
}
