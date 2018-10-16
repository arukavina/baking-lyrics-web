import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoRed from '../../static/images/logoRed.png'
import './Main.css'

export default class extends Component {
  render (handleSubmit) {
    const {
      history,
    } = this.props
    return(
      <div className="container">
        <img className="logoRed" src={logoRed} alt="baking logo" />
        <form onSubmit={handleSubmit} className="homeTitle">
          <p>
            {'CREATE'}
            <span>
              {'RANDOM LYRICS'}
            </span>
            {'WITH JUST A CLICK!'}
          </p>
          <Link className="tryButton" to="artist" >{'TRY IT OUT'}</Link>
        </form>
        <footer className="mainFooter">
          <span
            className="mainButton"
          >
            {'Open code in GitHub'}
          </span>
          <span
            onClick={() => history.push('about-us')}
            className="mainButton"
          >
            {'About Us'}
          </span>
        </footer>
      </div>
    )
  }
}
