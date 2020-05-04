import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons'
import logoRed from '../../static/images/logoRed.png'
import './HelpUs.css'

export default () => (
  <div className="container">
		<Link className="header" to={'/'}>
			<img className="logoRed" src={logoRed} alt="baking logo" />
		</Link>
		<div className="helpUsContent">
			<h1>
				HELP US
			</h1>
			<p>
				Baking-Lyrics is free, always evolving, user-supported service. But unfortunately it isn’t free to operate. We have salaries to pay and infrastructure costs to cover to make Baking-Lyrics available to our million users worldwide. Thankfully, many users do support us by donating what they can afford (💵), to help us support ongoing development. We ❤️ you, and couldn’t exist without you. Every donation helps! 
			</p>
		</div>
    <div className="donationLinks">
      <a href="https://www.patreon.com/baking_lyrics" className="patreonLink" target="_blank">
        <FontAwesomeIcon icon={faPatreon} size="4x" color="white"/>
        <span
          className="footerLink"
        >
          {'Patreon'}
        </span>
      </a>
      <a href="https://paypal.me/bakinglyrics" className="paypalLink" target="_blank">
        <FontAwesomeIcon icon={faPaypal} size="4x" color="white"/>
        <span
          className="footerLink"
        >
          {'Paypal'}
        </span>
      </a>
    </div>
  </div>
)
