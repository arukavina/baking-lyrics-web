import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import App from './App'
import Main from './component/Main'
import SeedData from './component/SeedData'
import GeneratedSong from './component/GeneratedSong'
import AboutUs from './component/AboutUs'
import HelpUs from './component/HelpUs/HelpUs'
import SearchArtist from './component/SearchArtist'
import TermsAndConditions from './component/TermsAndConditions/TermsAndConditions'

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/artist" component={SearchArtist} />
      <Route exact path="/start-text" component={SeedData} />
      <Route exact path="/song/:songId" component={GeneratedSong} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/help-us" component={HelpUs} />
      <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
      {/* 404 */}
      <Route>
        <Redirect to="/" /> 
      </Route>
    </Switch>
  </App>
)

export default Routes
