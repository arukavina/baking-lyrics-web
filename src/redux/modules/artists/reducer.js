import initialState from './initialState'

import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
  SET_ARTISTS_TOTAL,
} from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
        status: null,
        list: []
      }
    }
    case GET_ARTISTS_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        list: action.payload.list
      }
    }
    case SET_ARTISTS_TOTAL: {
      return {
        ...state,
        total: action.payload.total || 0
      }
    }
    case SAVE_COVER_IMAGE: {
      const itemIndex = state.list.findIndex(x => x.id === action.payload.id)
      // The artist may be gone already (a newer search replaced the list)
      if (itemIndex === -1) return state
      const newList = [...state.list]
      newList[itemIndex] = { ...newList[itemIndex], coverImg: action.payload.coverImg }
      return {
        ...state,
        list: newList
      }
    }
    case GET_ARTISTS_REJECTED: {
      return {
        ...state,
        isFetching: false,
        list: [],
        errorMsg: action.payload.errorMsg,
        status: action.payload.status ?? null
      }
    }
    default:
      return state
  }
}
