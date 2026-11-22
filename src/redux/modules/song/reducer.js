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
        status: null
      }
    }
    case GET_SONG_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        errorMsg: '',
        status: null,
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
        errorMsg: action.payload.errorMsg,
        status: action.payload.status ?? null
      }
    }
    case CLEAR_SONG: {
      return {
        ...state,
        errorMsg: '',
        status: null,
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
