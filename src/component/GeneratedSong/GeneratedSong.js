import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face from '../../static/images/face.png'
import logoRed from '../../static/images/logoRed.png'
import instagram from '../../static/images/instagram.png'
import facebook from '../../static/images/facebook.png'
import twitter from '../../static/images/twitter.png'
import './GeneratedSong.css'

export default class extends Component {

  text = 'the printine and typesetting industry\n' +
    'Lorem Ipsum has been the \n' +
    'standard dummy text ever since the,\n' +
    'when an unknown printer took\n\n' +
    'the printine and typesetting industry\n' +
    'Lorem Ipsum has been the \n' +
    'standard dummy text ever since the,\n' +
    'when an unknown printer took\n\n' +
    'the printine and typesetting industry\n' +
    'Lorem Ipsum has been the \n' +
    'standard dummy text ever since the,\n' +
    'when an unknown printer took\n\n' +
    'the printine and typesetting industry\n' +
    'Lorem Ipsum has been the \n' +
    'standard dummy text ever since the,\n' +
    'when an unknown printer took\n\n' +
    'the printine and typesetting industry\n' +
    'Lorem Ipsum has been the \n' +
    'standard dummy text ever since the,\n' +
    'when an unknown printer took'

  render() {
    return (
      <div className="generatedSongContainer">
        <div className="generatedSongHeader">
          <img className="logoRed" src={logoRed} alt="baking logo" />
          <div className="bandNameContainer">
            <span className="bandNameTitle">
              {'LYRICS BASED IN'}
            </span>
            <span className="bandNameTitle montserratTextBold">
              {'AC DC'}
            </span>
          </div>
        </div>
        <div className="textSongFlexContainer">
          <div className='textSongContainer'>
            <span className='textSongTitle'>
              {'Back in thunderstruck'}
            </span>
            <p className='textSong'>
              {this.text}
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
