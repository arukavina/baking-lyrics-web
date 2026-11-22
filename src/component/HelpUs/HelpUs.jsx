import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons'
import Container from '../shared/Container'
import ExternalLink from '../shared/Footer/ExternalLink'
import './HelpUs.css'

const BACK_REPO_URL = 'https://github.com/arukavina/baking-lyrics'
const FRONT_REPO_URL = 'https://github.com/arukavina/baking-lyrics-web'

const DONATIONS = [
  { label: 'Support us on Patreon', href: 'https://www.patreon.com/baking_lyrics', icon: faPatreon },
  { label: 'Donate with PayPal', href: 'https://paypal.me/bakinglyrics', icon: faPaypal },
]

const OTHER_WAYS = [
  { text: 'Star the project on GitHub, so more people find it.', href: BACK_REPO_URL, link: 'Star the repo' },
  { text: 'Found a bug or have an idea? Tell us about it.', href: `${BACK_REPO_URL}/issues`, link: 'Open an issue' },
  { text: 'Send a pull request: the backend and the website are both open source.', href: FRONT_REPO_URL, link: 'Read the code' },
  { text: 'Share the songs you bake. Every share brings in a new musician.', href: null, link: null },
]

const HelpUs = () => (
  <>
    <section className="section section--first">
      <Container>
        <header className="fade-up">
          <span className="eyebrow">Help us</span>
          <h1 className="page-title help-title">Keep the oven <span className="accent">warm</span></h1>
          <p className="lead help-lead">
            Baking Lyrics is a free, always evolving, user supported service. Unfortunately it isn&apos;t free to
            run.
          </p>
        </header>

        <div className="body-text help-text">
          <p>
            We have low salaries to pay and infrastructure costs to cover to keep Baking Lyrics available to our
            million users worldwide (error of &plusmn; 9&times;10<sup>5</sup>).
          </p>
          <p>
            Thankfully, many users support us by donating what they can afford, to help us keep developing it. We
            love you, and we couldn&apos;t exist without you. Every donation helps!
          </p>
          <p className="help-sign">The Baking Lyrics coding band</p>
        </div>

        <div className="help-donate">
          {DONATIONS.map(({ label, href, icon }) => (
            <ExternalLink key={href} href={href} className="btn-secondary">
              <FontAwesomeIcon icon={icon} className="btn-icon" />
              {label}
            </ExternalLink>
          ))}
        </div>
      </Container>
    </section>

    <section className="section" aria-labelledby="other-ways">
      <Container>
        <h2 id="other-ways" className="section-title">Other ways to help</h2>
        <p className="help-other-lead">No money needed for these.</p>
        <ul className="help-ways">
          {OTHER_WAYS.map(({ text, href, link }) => (
            <li key={text} className="help-way">
              <span className="help-way__dot" aria-hidden="true" />
              <span>
                {text}
                {href ? (
                  <>
                    {' '}
                    <ExternalLink href={href} className="text-link">{link}</ExternalLink>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  </>
)

export default HelpUs
