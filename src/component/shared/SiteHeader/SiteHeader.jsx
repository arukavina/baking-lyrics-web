import React from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import logoRed from '../../../static/images/logoRed.png'
import './SiteHeader.css'

// `match` lists extra path prefixes that also mark a link as current: the
// whole generator flow (artist, seed, song) lights up "Generate".
const NAV_LINKS = [
  { to: '/artist', label: 'Generate', match: ['/start-text', '/song/'] },
  { to: '/about-us', label: 'About us' },
  { to: '/help-us', label: 'Help us' },
]

const SiteHeader = () => {
  const { pathname } = useLocation()
  const navClass = match => ({ isActive }) => {
    const active = isActive || (match || []).some(prefix => pathname.startsWith(prefix))
    return active ? 'site-nav__link is-active' : 'site-nav__link'
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo" aria-label="Baking Lyrics home">
        <img src={logoRed} alt="Baking Lyrics" width="1144" height="616" />
      </Link>
      <nav className="site-nav" aria-label="Main">
        {NAV_LINKS.map(({ to, label, match }) => (
          <NavLink key={to} to={to} className={navClass(match)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader
