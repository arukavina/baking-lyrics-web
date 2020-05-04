import initialState from './initialState'

import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE
} from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_PENDING: {
      return {
        ...state,
        isFetching: true,
        list: []
      }
    }
    case GET_ARTISTS_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        list: action.payload.artistList,
        total: action.payload.total || state.total
      }
    }
    case SAVE_COVER_IMAGE: {
      const itemIndex = state.list.findIndex(x => x.id === action.payload.id)
      const newList = [...state.list]
      newList[itemIndex] = action.payload
      return {
        ...state,
        list: [
          ...newList
        ]
      }
    }
    case GET_ARTISTS_REJECTED: {
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
