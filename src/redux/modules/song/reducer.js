import initialState from './initialState'

import {
  GET_SONG_FULFILLED,
  GET_SONG_PENDING,
  GET_SONG_REJECTED,
} from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SONG_PENDING: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case GET_SONG_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        generatedSong: {
          artificialTitle: {...action.payload.artificial_title},
          baseArtist: {...action.payload.base_artist},
          lyrics: action.payload.lyrics,
          id: action.payload.id
        }
      }
    }
    case GET_SONG_REJECTED: {
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg
      }
    }
    default:
      return state
  }
}