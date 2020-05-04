import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import logoRed from '../../static/images/logoRed.png'
import './Main.css'

export default () => (
  <div className="container">
    <img className="logoRed" src={logoRed} alt="baking logo" />
    <div className="homeTitle">
      <h1>
        {'GENERATE'}
        <strong>
          {' RANDOM LYRICS '}
        </strong>
        {'WITH ARTIFICIAL INTELLIGENCE!'}
      </h1>
      <h2>OVERCOME YOUR WRITER'S BLOCK WITH JUST ONE CLICK</h2>
      <p>
        Dear musicians 🎸 , music enthusiasts 🎶 , writers 🖊 , and all artists 👩‍🎤 et. al., <br/>
        <br/>
        Be welcomed to Baking-Lyrics an Artificial Intelligence 🤖 song writing engine.<br/>
        Come here to get the necessary inspiration to rock your writer’s blockade. This is your cure. Don’t let anybody stop you, not even yourself, don’t let your rage against the machine blur your vision. We are here now. Pick your favorite artists, enjoy the silence, put in some words (or don’t) and let this crazy train create a bizarre new songs for you. Want to get a more specific results? Play with the parameters. Want to go all the way? Take an entire song, make a few arrangements and add your music to it, everything here can be reused and it’s yours. Just be kind enough to mention us.<br/>
        <br/>
        This is an open source, side project created from the bottom of the world. (Bottom to be read as arse). Here is a map.<br/>
        But is for everyone. Our humble contribution to those who make our lives wonderful freeing us from our own thoughts (for just a few minutes)<br/>
        <br/>
        We wish you the best so play as much as you want, release your creativity, innovate,  copy & paste.<br/>
        <br/>
        Best regards,<br/>
        The Baking-Lyrics band.
      </p>
      <Link className="tryButton" to="artist" >{'TRY IT OUT'}</Link>
    </div>
    <footer className="mainFooter">
      <a href="https://github.com/arukavina/baking-lyrics" className="gitHubLink">
        <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
        <span
          className="footerLink"
        >
          {'GitHub'}
        </span>
      </a>
      <Link className="footerLink" to="about-us" >{'About Us'}</Link>
      <Link className="footerLink" to="help-us" >{'Help Us'}</Link>
    </footer>
  </div>
)
