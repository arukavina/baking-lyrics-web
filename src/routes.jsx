import React from 'react'
import { Routes as RouterRoutes, Route, Navigate } from 'react-router'
import App from './App'
import Main from './component/Main'
import SeedData from './component/SeedData'
import GeneratedSong from './component/GeneratedSong'
import AboutUs from './component/AboutUs'
import SearchArtist from './component/SearchArtist'
import TermsAndConditions from './component/TermsAndConditions/TermsAndConditions'

// Route table without the store provider (used by the tests with their own store)
export const AppRoutes = () => (
  <RouterRoutes>
    <Route path="/" element={<Main />} />
    <Route path="/artist" element={<SearchArtist />} />
    <Route path="/start-text" element={<SeedData />} />
    <Route path="/song/:songId" element={<GeneratedSong />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    {/* 404 */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </RouterRoutes>
)

const Routes = () => (
  <App>
    <AppRoutes />
  </App>
)

export default Routes
