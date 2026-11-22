import { combineReducers } from '@reduxjs/toolkit'
import artists from "./artists/reducer";
import song from "./song/reducer";
import wizard from "./wizard/slice";

const reducers = {
  artists,
  song,
  wizard
}

export default combineReducers(reducers)
