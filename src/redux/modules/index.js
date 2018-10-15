import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import artists from "./artists/reducer";

const reducers = {
  form: formReducer,
  artists
}

export default combineReducers(reducers)
