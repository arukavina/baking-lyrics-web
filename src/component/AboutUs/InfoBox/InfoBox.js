import React, { Component } from 'react'
import './InfoBox.css'
import logoGithub from '../../../static/images/github-logo.png'
import logoTwitter from '../../../static/images/twitter.png'
import logoLinkedin from '../../../static/images/linkedin-logo.png'
import logoInstagram from '../../../static/images/instagram.png'
import logoChrome from '../../../static/images/chrome.png'

export default class extends Component {

  socialLogoHandler = () => {
    const {
      twitter,
      github,
      instagram,
      linkedin,
      type,
      web,
    } = this.props.social
    return(
      <div className="aboutUsSectionSocialContainer">
        {
          twitter &&
            <div className="infoBoxLogoContainer">
              <img className={ type === 'primary' ? "aboutUsSocialLogo" : "secondAboutUsSocialLogo" } src={logoTwitter} alt="linkedin logo" />
              <a href={`https://twitter.com/${twitter.replace('@', '')}`}>
                <span className={ type === 'primary' ? "aboutUsSocialName" : "secondAboutUsSocialName"}>
                  {twitter}
                </span>
              </a>
            </div>
        }
        {
          github &&
            <div className="infoBoxLogoContainer">
              <img className={ type === 'primary' ? "aboutUsSocialLogo" : "secondAboutUsSocialLogo" } src={logoGithub} alt="linkedin logo" />
              <a href={github}>
                <span className={ type === 'primary' ? "aboutUsSocialName" : "secondAboutUsSocialName"}>
                  {github}
                </span>
              </a>
            </div>
        }
        {
          instagram &&
            <div className="infoBoxLogoContainer">
              <img className={ type === 'primary' ? "aboutUsSocialLogo" : "secondAboutUsSocialLogo" } src={logoInstagram} alt="linkedin logo" />
              <a href={`https://instagram.com/${instagram}`}>
                <span className={ type === 'primary' ? "aboutUsSocialName" : "secondAboutUsSocialName"}>
                  {instagram}
                </span>
              </a>
            </div>
        }
        {
          linkedin &&
            <div className="infoBoxLogoContainer">
              <img className={ type === 'primary' ? "aboutUsSocialLogo" : "secondAboutUsSocialLogo" } src={logoLinkedin} alt="linkedin logo" />
              <a href={`https://linkedin.com/in${linkedin}`}>
                <span className={ type === 'primary' ? "aboutUsSocialName" : "secondAboutUsSocialName"}>
                  {linkedin}
                </span>
              </a>
            </div>
        }
        {
          web &&
            <div className="infoBoxLogoContainer">
              <img className={ type === 'primary' ? "aboutUsSocialLogo" : "secondAboutUsSocialLogo" } src={logoChrome} alt="linkedin logo" />
              <a href={web}>
                <span className={ type === 'primary' ? "aboutUsSocialName" : "secondAboutUsSocialName"}>
                  {web}
                </span>
              </a>
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
      roles,
      type,
    } = this.props
    return (
      <div className={ type === 'primary' ? "aboutUsSectionData" : "secondAboutUsSectionData"}>
        <img className={ type === 'primary' ? "aboutUsSectionImage" : "secondAboutUsSectionImage"} src={image} alt="devsImage" />
        <span className={ type === 'primary' ? "aboutUsSectionName" : "secondAboutUsSectionName"}>{name}</span>
        <span className={ type === 'primary' ? "aboutUsSectionRole" : "secondAboutUsSectionRole"}>{roles}</span>
        <p className={ type === 'primary' ? "aboutUsSectionDescription" : "secondAboutUsSectionDescription"}>
          {description}
        </p>
        {this.socialLogoHandler()}
      </div>
    )
  }
}
