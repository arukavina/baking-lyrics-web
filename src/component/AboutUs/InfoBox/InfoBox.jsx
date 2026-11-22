import React, { Component } from 'react'
import './InfoBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFirefoxBrowser, faLinkedinIn, faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

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
              <FontAwesomeIcon icon={faTwitter} size="lg" color="white" />
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
              <FontAwesomeIcon icon={faGithub} size="lg" color="white" />
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
              <FontAwesomeIcon icon={faInstagram} size="lg" color="white" />
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
              <FontAwesomeIcon icon={faLinkedinIn} size="lg" color="white" />
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
              <FontAwesomeIcon icon={faFirefoxBrowser} size="lg" color="white" />
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
