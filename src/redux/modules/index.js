import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import artists from "./artists/reducer";
import song from "./song/reducer";

const reducers = {
  form: formReducer,
  artists,
  song
}

export default combineReducers(reducers)
