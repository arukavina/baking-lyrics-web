import React from 'react'
import { Routes as RouterRoutes, Route, Navigate } from 'react-router'
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
    <RouterRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/artist" element={<SearchArtist />} />
      <Route path="/start-text" element={<SeedData />} />
      <Route path="/song/:songId" element={<GeneratedSong />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help-us" element={<HelpUs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  </App>
)

export default Routes
