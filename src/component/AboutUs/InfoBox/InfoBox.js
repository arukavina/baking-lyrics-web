import React, { Component } from 'react'
import './InfoBox.css'
import logoGithub from '../../../static/images/github-logo.png'
import logoTwitter from '../../../static/images/twitter2.png'
import logoLinkedin from '../../../static/images/linkedin-logo.png'
import instagram2 from '../../../static/images/instagram2.png'

export default class extends Component {

  socialLogoHandler = () => {
    const {
      twitter,
      github,
      instagram,
      linkedin,
    } = this.props.social
    return(
      <div className="aboutUsSectionSocialContainer">
        {
          twitter &&
            <div className="infoBoxLogoContainer">
              <img className="aboutUsSocialLogo" src={logoTwitter} alt="linkedin logo" />
              <span className="aboutUsSocialName">{twitter}</span>
            </div>
        }
        {
          github &&
            <div className="infoBoxLogoContainer">
              <img className="aboutUsSocialLogo" src={logoGithub} alt="linkedin logo" />
              <span className="aboutUsSocialName">{github}</span>
            </div>
        }
        {
          instagram &&
            <div className="infoBoxLogoContainer">
              <img className="aboutUsSocialLogo" src={instagram2} alt="linkedin logo" />
              <span className="aboutUsSocialName">{instagram}</span>
            </div>
        }
        {
          linkedin &&
            <div className="infoBoxLogoContainer">
              <img className="aboutUsSocialLogo" src={logoLinkedin} alt="linkedin logo" />
              <span className="aboutUsSocialName">{linkedin}</span>
            </div>
        }
      </div>
    )
  }

  render() {
    const {
      name,
      description,
      image,
    } = this.props
    return (
      <div className="aboutUsSectionData">
        <img className="aboutUsSectionImage" src={image} alt="devsImage" />
        <span className="aboutUsSectionName">{name}</span>
        <p className="aboutUsSectionDescription">
          {description}
        </p>
        {this.socialLogoHandler()}
      </div>
    )
  }
}
