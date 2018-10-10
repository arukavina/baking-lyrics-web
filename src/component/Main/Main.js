import React from 'react'
import { Link } from 'react-router-dom'

import logoRed from '../../static/images/logoRed.png'
import './Main.css'

export default ({ handleSubmit }) => {
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
        <span>{
          'Open code in GitHub'}
        </span>
        <span>
          {'About Us'}
        </span>
      </footer>
    </div>
  );
}
