import { configureStore as configureReduxStore } from '@reduxjs/toolkit'
import rootReducer from './redux/modules'

export default function configureStore() {
  return configureReduxStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
  })
}
