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
      <p>
        {'GENERATE'}
        <span>
          {'RANDOM LYRICS'}
        </span>
        {'WITH JUST A CLICK!'}
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
    </footer>
  </div>
)