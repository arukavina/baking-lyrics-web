import React from 'react'
import { Link } from 'react-router-dom'
import argentinaFlag from '../../../static/images/argentinaFlag.png'
import './Footer.css'

const sanNicolasLocationUrl = `https://goo.gl/maps/2h92kAcdU73BB5om7`

export default ({ignoreTandC}) => (
  <div className="sharedFooter">
    { ignoreTandC ? <div></div> : <div>By using our Baking-Lyrics engine, you accept our T&C that can be found <Link to="/terms-and-conditions" className="termsConditionsLink" target="_blank" >here</Link>.</div>}
    <div className="locationText">
      Baking Lyrics 🎼 2020.&nbsp;
      <a href={sanNicolasLocationUrl} target="_blank" className="sanNicolasLink">San Nicol&aacute;s de los Arroyos</a>
      , Argentina <img className="argentinaFlag" src={argentinaFlag}/>
    </div>
  </div>
)