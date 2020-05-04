import initialState from './initialState'

import {
  GET_SONG_FULFILLED,
  GET_SONG_PENDING,
  GET_SONG_REJECTED,
  CLEAR_SONG,
} from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SONG_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
      }
    }
    case GET_SONG_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        errorMsg: '',
        generatedSong: {
          artificialTitle: {...action.payload.artificial_title},
          baseArtist: {...action.payload.base_artist},
          lyrics: action.payload.lyrics,
          id: action.payload.id,
          coverImg: action.payload.coverImg || null
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
    case CLEAR_SONG: {
      return {
        ...state,
        generatedSong: {
          artificialTitle: {},
          baseArtist: {},
          lyrics: ''
        }
      }
    }
    default:
      return state
  }
}