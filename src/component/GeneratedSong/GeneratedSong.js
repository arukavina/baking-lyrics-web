import React, { Component } from 'react'
import { Link } from "react-router-dom";
import logoRed from '../../static/images/logoRed.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebook } from '@fortawesome/free-brands-svg-icons'
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

  sectionStyle = {
    background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 100%), url("${ this.props.background}") no-repeat center top fixed`,
    backgroundSize: 'cover'
  };

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
      }
    } = this.props

    return (
      <div className="generatedSongContainer" style={this.sectionStyle}>
        <div className="generatedSongHeader">
          <Link className="header" to={'/'}>
            <img className="logoRed" src={logoRed} alt="baking logo" />
          </Link>
          <div className="bandNameContainer">
            <span className="bandNameTitle">
              {'LYRICS BASED IN'}
            </span>
            <span className="bandNameTitle montserratTextBold">
              {name}
            </span>
          </div>
        </div>
        <div className="textSongFlexContainer">
          <div className="textSongContainer">
            <span className="textSongTitle">
              {title}
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
          </div>
        </div>
      </div>
    )
  }
}
