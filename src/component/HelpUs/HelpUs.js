import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import './HelpUs.css'

export default () => (
  <div className="containerLayout regularContainerImage helpUsContainer">
    <div className="regularHeader">
      <Link className="regularHeaderLink" to={'/'}>
        <img className="logoRed" src={logoRed} alt="baking logo" />
      </Link>
    </div>
		<div className="helpUsContent">
			<h1 className="pageTitle">
				HELP US
			</h1>
			<p className="pageText">
        Baking-Lyrics is free, always evolving, user-supported service. But unfortunately it isn’t free to operate. 
        <br/><br/>
        We have low salaries to pay and infrastructure costs to cover to make Baking-Lyrics available to our million users worldwide (error of ± 9*10^5).
        <br/><br/>
        Thankfully, many users do support us by donating what they can afford (💵), to help us support ongoing development.
        <br/><br/>
        We ❤️ you, and couldn’t exist without you. Every donation helps!
        <br/><br/>
        The Baking-Lyrics coding ⌨️ band.
			</p>
		</div>
    <div className="donationLinks">
      <a href="https://www.patreon.com/baking_lyrics" className="patreonLink" target="_blank">
        <FontAwesomeIcon icon={faPatreon} size="4x" color="white"/>
        <span
          className="aboutUsFooterLink footerLink"
        >
          {'Patreon'}
        </span>
      </a>
      <a href="https://paypal.me/bakinglyrics" className="paypalLink" target="_blank">
        <FontAwesomeIcon icon={faPaypal} size="4x" color="white"/>
        <span
          className="aboutUsFooterLink footerLink"
        >
          {'Paypal'}
        </span>
      </a>
    </div>
    <Footer />
  </div>
)
