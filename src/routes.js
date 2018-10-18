import React from 'react'
import { Route, Switch } from 'react-router'
// import NotFound from './components/NotFound/NotFound'
import App from './App'
import Main from './component/Main'
import SeedData from './component/SeedData'
import GeneratedSong from './component/GeneratedSong'
import AboutUs from './component/AboutUs'
import SearchArtist from './component/SearchArtist'

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/artist" component={SearchArtist} />
      <Route exact path="/start-text" component={SeedData} />
      <Route exact path="/song/:songId" component={GeneratedSong} />
      <Route exact path="/about-us" component={AboutUs} />
      {/* 404 */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </App>
)

export default Routes
