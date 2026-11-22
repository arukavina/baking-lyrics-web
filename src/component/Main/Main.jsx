import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { getArtistsTotal, ping } from '../../helpers/api'
import Container from '../shared/Container'
import './Main.css'

const REPO_URL = 'https://github.com/arukavina/baking-lyrics'

const STEPS = [
  {
    n: '01',
    title: 'Pick an artist',
    body: 'Search the database for the artist or band whose style you want to borrow.',
  },
  {
    n: '02',
    title: 'Seed a few words',
    body: 'Write how the song starts, or just a few words. The machine picks up where you leave off.',
  },
  {
    n: '03',
    title: 'Bake lyrics',
    body: 'A brand new song is ready in seconds. Share it, rework it, or bake another one.',
  },
]

// Fixed facts, shown after the live artist count when the backend answers
const FACTS = [
  { value: 'English', label: 'lyrics' },
  { value: '2020', label: 'first batch baked' },
  { value: 'GPL v3', label: 'open source' },
]

export default function Main() {
  const [total, setTotal] = useState(null)

  useEffect(() => {
    let active = true
    // Fire and forget warm-up of the backend
    ping().catch(() => {})
    getArtistsTotal()
      .then((count) => { if (active && Number.isInteger(count) && count > 0) setTotal(count) })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const stats = total
    ? [{ value: String(total), label: total === 1 ? 'artist in the database' : 'artists in the database' }, ...FACTS]
    : FACTS

  return (
    <>
      <section className="section section--first home-hero">
        <Container>
          <div className="fade-up">
            <span className="eyebrow">AI lyrics generator</span>
            <h1 className="page-title home-hero__title">
              Generate random lyrics with <span className="accent">artificial intelligence</span>
            </h1>
            <p className="lead home-hero__lead">
              Overcome your writer&apos;s block with just one click. Pick an artist, give the machine a few
              words and it bakes a brand new song in their style.
            </p>
            <div className="home-hero__actions">
              <Link className="btn-primary" to="/artist">
                Try it out
                <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
              </Link>
              <Link className="btn-secondary" to="/about-us">Meet the bakers</Link>
            </div>
            <ul className="home-stats meta" aria-label="Baking Lyrics in numbers">
              {stats.map(({ value, label }) => (
                <li key={label} className="home-stats__item">
                  <span className="home-stats__value">{value}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="how-it-works">
        <Container>
          <span className="eyebrow">How it works</span>
          <h2 id="how-it-works" className="section-title home-section-title">Three steps to a new song</h2>
          <ol className="home-steps">
            {STEPS.map(step => (
              <li key={step.n} className="card home-step">
                <span className="home-step__n" aria-hidden="true">{step.n}</span>
                <h3 className="card-title home-step__title">{step.title}</h3>
                <p className="home-step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section" aria-labelledby="welcome">
        <Container>
          <span className="eyebrow">Welcome</span>
          <h2 id="welcome" className="section-title home-section-title">A note from the band</h2>
          <div className="body-text home-letter">
            <p>Dear musicians, writers, artists, music enthusiasts, et al.,</p>
            <p>
              Welcome to Baking Lyrics, an artificial intelligence song writing engine. Come here to get the
              inspiration you need to rock your writer&apos;s block. This is the cure. Don&apos;t let anybody stop
              you, not even yourself. Break on through and don&apos;t let your rage against the machine blur your
              vision. We are here to help you live forever in your creations.
            </p>
            <p>
              Pick your favorite artist, enjoy the silence, put in some words (or don&apos;t) and let this crazy
              train create bizarre new songs for you. Want more specific results? Play with the parameters. Want
              to go all the way? Take an entire song, make a few arrangements and add your music to it.
              Everything here can be reused and it&apos;s yours. Just be kind enough to mention us.
            </p>
            <p>
              This is an open source side project created from the bottom of the world, and it is for everyone.
              It is our humble contribution to those who make our lives wonderful by freeing us from our own
              thoughts, just for a few minutes, through music.
            </p>
            <p>
              We wish you the best, so play as much as you want, release your creativity, innovate, copy and
              paste.
            </p>
            <p className="home-letter__sign">
              Best regards,
              <br />
              The Baking Lyrics coding band
            </p>
          </div>
          <div className="home-letter__actions">
            <a className="btn-secondary" href={REPO_URL} target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faGithub} className="btn-icon" />
              View the code on GitHub
            </a>
            <Link className="text-link home-letter__help" to="/help-us">Help us keep baking</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
