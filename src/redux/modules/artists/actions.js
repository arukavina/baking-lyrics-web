import get from "lodash/get";
import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
} from './const'
import { getArtistsData } from '../../../helpers/api/artists'
// import {
//   getAppInstanceData,
//   putAppInstanceItem,
//   delAAppInstanceItem,
//   postAppInstanceItem,
// } from '../../../helpers/api/appinstance'


export const getArtists = (filter = '') => (dispatch) => {
  dispatch({
    type: GET_ARTISTS_PENDING
  })
  return getArtistsData(filter.replace(' ', '-'))
    .then((artists) => {
      const artistList = filter ? artists.data : artists.data.items
      artistList.forEach(async item => {
        const name = item.name.replace('-', '%20').replace(' ', '%20')
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=*&redirects=1&format=json&piprop=original&titles=${name}`, { "Content-Type": "application/json; charset=UTF-8" });
        const json = await res.json();
        const firstElement = Object.keys(json.query.pages)[0];
        const coverImg = get(json.query.pages[firstElement], 'original.source');
        dispatch({
          type: SAVE_COVER_IMAGE,
          payload: {
            ...item,
            coverImg
          }
        });
        })
      dispatch({
        type: GET_ARTISTS_FULFILLED,
        payload: artistList
      })
    })
    .catch((e) => {
      dispatch({
        type: GET_ARTISTS_REJECTED,
        payload: {
          errorMsg: `Failed trying to get artists ${e}`
        }
      })
    })
}
