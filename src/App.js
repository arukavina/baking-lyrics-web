import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()
class App extends Component {
  render() {
    const { children } = this.props
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }
}

export default App;
