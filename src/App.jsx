import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()
const App = ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)
export default App
