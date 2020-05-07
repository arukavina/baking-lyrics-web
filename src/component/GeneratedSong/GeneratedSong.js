import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import './GeneratedSong.css'

export default class extends Component {
  componentDidMount() {
    const {
      getGeneratedSong,
      lyrics,
      match
    } = this.props

    if (!lyrics) {
      getGeneratedSong(match.params.songId)
    }
  }

  openURLInPopup(url) {
    window.open(
      `${url}http://bakinglyrics.com/song/${this.props.match.params.songId}`,
      "pop",
      "width=600, height=400, scrollbars=no"
    );
  }

  render() {
    const {
      generatedSong: {
        artificialTitle: {
          title
        },
        baseArtist: {
          name
        },
        lyrics
      },
      background,
    } = this.props

    const sectionStyle = {
      background: `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("${background}") no-repeat center center/cover`
    };
    
    return (
      <div className="generatedSongContainer" style={sectionStyle}>
        <div className="generatedSongHeader">
          <div className="regularHeaderContainer">
            <Link className="regularHeader" to={'/artist'}>
              <img className="logoRed" src={logoRed} alt="baking logo" />
            </Link>
          </div>
          <div className="bandNameContainer">
            <span className="bandNameTitle">
              {'LYRICS BASED IN'}
            </span>
            <span className="bandNameTitle montserratTextBold">
              {name && name.replace(/\-/g, ' ')}
            </span>
          </div>
        </div>
        <div className="textSongFlexContainer">
          <div className="textSongContainer">
            <span className="textSongTitle">
              {title && title.replace(/\-/g, ' ')}
            </span>
            <p className="textSong">
              {lyrics}
            </p>
          </div>
        </div>
        <div className="generatedSongFooterContainer">
          <span className="shareTitle">
            {'SHARE'}
          </span>
          <div className="socialContainer">
            <a
              onClick={() =>
                this.openURLInPopup('https://www.facebook.com/sharer/sharer.php?u=')
              }
              className="link"
              
            >
              <FontAwesomeIcon icon={faFacebook} size="3x" color="white" />
            </a>
            <a
              onClick={() =>
                this.openURLInPopup('https://twitter.com/intent/tweet?text=Take%20a%20look%20at%20this%20new%20song:%20')
              }
              className="link"
            >
              <FontAwesomeIcon icon={faTwitterSquare} size="3x" color="white" />
            </a>
            <a href={`https://api.whatsapp.com/send?text=Check%20this%20out!%20I%20just%20generated%20the%20following%20lyrics%20using%20Artificial%20Intelligence:%0A${document.URL}`} target="_blank" className="link">
              <FontAwesomeIcon icon={faWhatsapp} size="3x" color="white" />
            </a>
          </div>
          <div className="tryItText">Try it</div>
          <Link className="tryButton" to="/artist" >{'ONE MORE TIME'}</Link>
        </div>
        <Footer />
      </div>
    )
  }
}
