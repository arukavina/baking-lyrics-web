import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Main from './component/Main'
import SeedData from './component/SeedData'
import GeneratedSong from './component/GeneratedSong'
import configureStore from './store'

const store = configureStore()
class App extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <Provider store={store}>
        <React.Fragment>
          {page === 1 && <Main onSubmit={this.nextPage} />}
          {page === 2 && (
            <SeedData
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
            />
          )}
          {page === 3 && (
            <GeneratedSong
              previousPage={this.previousPage}
              onSubmit={onSubmit}
            />
          )}
        </React.Fragment>
      </Provider>
    )
  }
}

export default App;
