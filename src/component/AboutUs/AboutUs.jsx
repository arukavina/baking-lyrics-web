import React from 'react'
import { Link } from 'react-router'
import InfoBox from './InfoBox'
import Container from '../shared/Container'
import jonathanPerkesImg from '../../static/images/jonathanPerkes.webp'
import andreiRukavinaImg from '../../static/images/andreiRukavina.webp'
import sergioBancheroImg from '../../static/images/sergioBanchero.webp'
import solanaSierraImg from '../../static/images/solanaSierra.webp'
import nicolasCribioliImg from '../../static/images/nicolasCribioli.webp'
import radiumLogo from '../../static/images/radium-logo.webp'
import './AboutUs.css'

const TEAM = [
  {
    name: 'Sergio Banchero',
    roles: 'AI',
    image: sergioBancheroImg,
    description:
      "Electronics engineer gone data scientist. Won't fix what's not broken, but everything seems broken to me. " +
      'Can identify the hex RGB of a color just from looking at it.',
    social: {
      linkedin: 'https://linkedin.com/in/sergio-banchero',
    },
  },
  {
    name: 'Andrei Rukavina',
    roles: 'AI, backend, DevOps',
    image: andreiRukavinaImg,
    description:
      'Software engineer, data scientist and InfoVis enthusiast with an outlandish taste for yerba mate. ' +
      'Member of the Python / R purifiers fictitious society. I can speak really loud.',
    social: {
      twitter: 'https://twitter.com/andrei_rukavina',
      github: 'https://github.com/arukavina',
      linkedin: 'https://linkedin.com/in/andreirukavina',
    },
  },
  {
    name: 'Solana Sierra',
    roles: 'UX design',
    image: solanaSierraImg,
    description:
      'Interaction designer. Expert in user experience and user interface. Member of the Interaction Design ' +
      'Foundation. Ravenclaw Potterhead and undercover unicorn.',
    social: {
      instagram: 'https://instagram.com/solisierra',
      linkedin: 'https://linkedin.com/in/solanasierra',
    },
  },
  {
    name: 'Jonathan Perkes',
    roles: 'Testing and coverage',
    image: jonathanPerkesImg,
    description:
      "Computer engineer, data scientist. I've been particularly interested in Fourier analysis and DSP as of " +
      "late. I once saw the Necronomicon's copy at my university library and I can create origami versions of " +
      'flowers I casually see during the day.',
    social: {
      linkedin: 'https://linkedin.com/in/jonathan-perkes',
    },
  },
  {
    name: 'Nicolas Cribioli',
    roles: 'DevOps',
    image: nicolasCribioliImg,
    description:
      'System *, DevOps. Barbecue expert. Handyperson, a.k.a. the could you please fix my ' +
      '{laptop | mobile | microwave | printer}? guy. This is fine.',
    social: {
      linkedin: 'https://linkedin.com/in/nicolas-cribioli',
    },
  },
  {
    name: 'Radium Rocket',
    roles: 'Web',
    image: radiumLogo,
    social: {
      web: 'http://radiumrocket.com/',
    },
  },
]

const AboutUs = () => (
  <>
    <section className="section section--first">
      <Container>
        <header className="fade-up">
          <span className="eyebrow">About us</span>
          <h1 className="page-title about-title">We are the <span className="accent">bakers</span></h1>
          <p className="lead about-lead">
            Baking Lyrics is an open source side project made by a small band of engineers, data scientists and
            designers from the bottom of the world, who love music as much as they love machines.
          </p>
        </header>
      </Container>
    </section>

    <section className="section" aria-labelledby="team">
      <Container>
        <h2 id="team" className="section-title">The team</h2>
        <ul className="team-grid">
          {TEAM.map(member => (
            <li key={member.name}>
              <InfoBox {...member} />
            </li>
          ))}
        </ul>
        <p className="about-help body-text">
          Want to lend a hand? <Link className="text-link" to="/help-us">See how you can help us</Link>.
        </p>
      </Container>
    </section>
  </>
)

export default AboutUs
