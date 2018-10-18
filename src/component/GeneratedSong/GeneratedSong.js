import React, { Component } from 'react'
import logoRed from '../../static/images/logoRed.png'
import instagram from '../../static/images/instagram.png'
import facebook from '../../static/images/facebook.png'
import twitter from '../../static/images/twitter.png'
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
      <div className="generatedSongContainer">
        <div className="generatedSongHeader">
          <img className="logoRed" src={logoRed} alt="baking logo" />
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
          <div className='textSongContainer'>
            <span className='textSongTitle'>
              {title}
            </span>
            <p className='textSong'>
              {lyrics}
            </p>
          </div>
        </div>
        <div className='generatedSongFooterContainer'>
          <span className='generatedSongFooterTitle'>
            {'SHARE'}
          </span>
          <div className='socialContainer'>
            <div>
              <img className="socialIcon" src={facebook} alt="socialIcon" />
            </div>
            <div>
              <img className="socialIcon" src={instagram} alt="socialIcon" />
            </div>
            <div>
              <img className="socialIcon" src={twitter} alt="socialIcon" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
