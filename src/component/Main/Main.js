import React from 'react'
import { Link } from 'react-router-dom'

import logoGithub from '../../static/images/github-logo.png'
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
        <img className="aboutUsSocialLogoHome" src={logoGithub} alt="linkedin logo" />
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