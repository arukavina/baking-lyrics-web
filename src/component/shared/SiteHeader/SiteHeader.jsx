import React from 'react'
import { Link, NavLink } from 'react-router'
import logoRed from '../../../static/images/logoRed.png'
import './SiteHeader.css'

const NAV_LINKS = [
  { to: '/artist', label: 'Generate' },
  { to: '/about-us', label: 'About us' },
  { to: '/help-us', label: 'Help us' },
]

const navClass = ({ isActive }) => (isActive ? 'site-nav__link is-active' : 'site-nav__link')

const SiteHeader = () => (
  <header className="site-header">
    <Link to="/" className="site-header__logo" aria-label="Baking Lyrics home">
      <img src={logoRed} alt="Baking Lyrics" width="1144" height="616" />
    </Link>
    <nav className="site-nav" aria-label="Main">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink key={to} to={to} className={navClass}>
          {label}
        </NavLink>
      ))}
    </nav>
  </header>
)

export default SiteHeader
