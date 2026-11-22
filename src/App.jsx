import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import Grain from './component/shared/Grain'
import SiteHeader from './component/shared/SiteHeader'
import Footer from './component/shared/Footer'
import './App.css'

const store = configureStore()

// Page shell, rendered once: the footer stays at the bottom on short pages
export const Shell = ({ children }) => (
  <div className="site-shell">
    <Grain />
    <SiteHeader />
    <main className="site-main">{children}</main>
    <Footer />
  </div>
)

const App = ({ children }) => (
  <Provider store={store}>
    <Shell>{children}</Shell>
  </Provider>
)
export default App
