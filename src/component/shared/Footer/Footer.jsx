import React from 'react'
import { Link, useLocation } from 'react-router'
import Container from '../Container'
import BuildInfo from './BuildInfo'
import ExternalLink from './ExternalLink'
import { GITHUB_URL, LINKEDIN_URL, TERMS_PATH } from './build'
import './Footer.css'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="site-footer__icon">
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.71.83.58A12 12 0 0 0 12 .3Z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="site-footer__icon">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const SOCIAL_LINKS = [
  { label: 'GitHub', href: GITHUB_URL, Icon: GithubIcon },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: LinkedInIcon },
]

const Footer = () => {
  const { pathname } = useLocation()
  // The terms page does not need a link to itself
  const showTerms = pathname !== TERMS_PATH

  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__info">
          <p className="site-footer__tagline">
            Baking Lyrics<span className="site-footer__dot">.</span> Lyrics by machines, since 2018.
          </p>
          <BuildInfo />
          {showTerms ? (
            <p className="site-footer__terms">
              <Link to={TERMS_PATH} className="site-footer__link">
                By using Baking Lyrics you accept our terms and conditions.
              </Link>
            </p>
          ) : null}
        </div>
        <div className="site-footer__social">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <ExternalLink key={label} href={href} aria-label={label} className="site-footer__social-link">
              <Icon />
            </ExternalLink>
          ))}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
