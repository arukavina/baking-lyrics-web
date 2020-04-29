import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()
export default ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)
