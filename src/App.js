import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import configureStore from './store'

const store = configureStore()
class App extends Component {
  initializeReactGA = () => {
    ReactGA.initialize('UA-118412070-1');
    ReactGA.pageview('/');
  }

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
