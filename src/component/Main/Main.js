import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../shared/Footer/Footer';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import logoRed from '../../static/images/logoRed.png'
import './Main.css'

export default class extends Component {
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/ping`)
  }

  render() {
    return (
      <div className="containerLayout regularContainerImage">
        <div className="regularHeader">
          <img className="logoRed" src={logoRed} alt="baking logo" />
        </div>
        <div className="homeContent">
          <h1 className="pageTitle">
            {'GENERATE'}
            <strong>
              {' RANDOM LYRICS '}
            </strong>
            {'WITH ARTIFICIAL INTELLIGENCE!'}
          </h1>
          <h2>OVERCOME YOUR WRITER'S BLOCK WITH JUST ONE CLICK</h2>
          <p className="pageText">
            Dear musicians 🎸 , writers 🖊 , artists 👩‍🎤 , music enthusiasts 🎶, et. al.,
        <br /><br />
        Welcome to Baking-Lyrics, an Artificial Intelligence 🤖 song writing engine.
        <br />
        Come here to get the necessary inspiration to rock your writer’s block. This is the cure. Don’t let anybody stop you, not even yourself. Break on through and don’t let your rage against the machine blur your vision. We are here now to help you live forever in your creations.
        <br /><br />
        Pick your favorite artists, enjoy the silence, put in some words (or don’t) and let this crazy train create bizarre new songs for you. Want to get more specific results? Play with the parameters. Want to go all the way? Take an entire song, make a few arrangements and add your music to it. Everything here can be reused and it’s yours. Just be kind enough to mention us.
        <br /><br />
        This is an open source side project created from the bottom of the world. This is for everyone. It is our humble contribution to those who make our lives wonderful by freeing us from our own thoughts (just for a few minutes) through music.
        <br /><br />
        We wish you the best so play as much as you want, release your creativity, innovate,  copy & paste.
        <br />
            <br />
        Best regards,<br />
        The Baking-Lyrics coding ⌨️ band.
      </p>
          <Link className="tryButton" to="artist" >{'TRY IT OUT'}</Link>
        </div>
        <div className="homeLinks">
          <a href="https://github.com/arukavina/baking-lyrics" className="githubLink mainLink">
            <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
            .&nbsp;GitHub
          </a>
          <Link className="mainLink" to="about-us" >{'About Us'}</Link>
          <Link className="mainLink" to="help-us" >{'Help Us'}</Link>
        </div>
        <Footer />
      </div>
    )
  }
}