import React from 'react'
import logoRed from '../../static/images/logoRed.png'
import imageDragons from '../../static/images/imageDragonsLogo.png'
import './Main.css'

export default ({ handleSubmit }) => {
  return(
    <div className="backgoundTwo">
      <div className="header">
        <img className="logoRed" src={logoRed} />
      </div>
      <form onSubmit={handleSubmit} className="main">
        <p>CREATE <span>RANDOM</span> LYRICS WITH JUST A CLICK!</p>
        <button className="searchButton" type="submit" name="TRY" >TRY IT OUT</button>
      </form>
    </div>
  );
}
