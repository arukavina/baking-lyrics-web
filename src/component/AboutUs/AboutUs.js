import React, { Component } from 'react'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink } from "react-router-dom"
import Footer from '../shared/Footer/Footer'
import InfoBox from './InfoBox'
import logoRed from '../../static/images/logoRed.png'
import menu from '../../static/images/menu.png'
import jonathanPerkesImg from '../../static/images/jonathanPerkes.jpeg'
import andreiRukavinaImg from '../../static/images/andreiRukavina.png'
import sergioBancheroImg from '../../static/images/sergioBanchero.png'
import solanaSierraImg from '../../static/images/solanaSierra.png'
import nicolasCribioliImg from '../../static/images/nicolasCribioli.png'
import radiumLogo from '../../static/images/radium-logo.jpg'
import './AboutUs.css'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 80)
  }

  lineTitle = (title) => {
    return(
      <div className="aboutUsSectionSeparatorContainer">
        <div className="aboutUsSectionSeparator"/>
      </div>
    )
  }

  generateLinks = (devs) => {
    return devs.map(dev => (
      <span className="aboutUsMenuTitle" key={dev.name}>
        <Link
          activeClass="active"
          to={dev.link}
          spy={true}
          offset={-200}
          smooth={true}
          duration={500}
        >
          {dev.name}
        </Link>
      </span>
    ))
  }

  menu = (classSelected) => {

    const devs = [{ 
      link: 'sergio', 
      name: 'SERGIO BANCHERO'
    },{ 
      link: 'andrei', 
      name: 'ANDREI RUKAVINA'
    },{ 
      link: 'solana', 
      name: 'SOLANA SIERRA'
    },{ 
      link: 'jonathan', 
      name: 'JONATHAN PERKES'
    },{ 
      link: 'nicolas', 
      name: 'NICOLAS CRIBIOLI'
    },{ 
      link: 'radium', 
      name: 'RADIUM ROCKET'
    }]

    return(
      <div className={classSelected}>
        {this.generateLinks(devs)}
      </div>
    )
  }

  showMenu = (aboutUsMenu) => {
    if (this.state.menuOpen) {
      return(
        this.menu(aboutUsMenu)
      )
    }
  }

  render() {
    return(
      <div className="aboutUsContainer regularContainerImage">
        <div className="aboutUsHeader">
          <RouterLink to="/" className="aboutUsLogoContainer">
            <span className="aboutUsTitleImage">WE CREATED</span>
            <img className="aboutUsLogoRed" src={logoRed} alt="baking logo" />
          </RouterLink>
          <div className="aboutUsMenuContainer">
            <div
              className="menuButton"
              onClick={() => this.setState({
                menuOpen: !this.state.menuOpen
                })
              }
            >
              <img className="menu" src={menu} alt="baking logo" />
            </div>
            <nav>

            </nav>
            {this.menu('aboutUsMenuFullScreen')}
            {this.showMenu('aboutUsMenu')}
          </div>
        </div>
        <div className="aboutUsSectionContainer">
          <Element name="sergio" className="aboutUsElementContainer">
            <div className="aboutUsSectionDataContainer">
              <InfoBox
                name={'SERGIO BANCHERO'}
                type={'primary'}
                roles={'AI'}
                image={sergioBancheroImg}
                description={
                  `Electronics Engineer gone Data Scientist.\n` +
                  `Won't fix what's not broken, but everything\n` +
                  `seems broken to me. Can identify the hex RGB\n` +
                  `of a color just from looking at it.`
                }
                social={{
                  linkedin: '/sergio-banchero',
                }}
              />
              <Element name="andrei" >
                <InfoBox
                  name={'ANDREI RUKAVINA'}
                  type={'primary'}
                  roles={'AI, Backend, DevOps'}
                  image={andreiRukavinaImg}
                  description={
                    `Software Engineer, Data scientist & InfoVis \n` +
                    `enthusiastic with an outlandish taste for\n` +
                    `yerba mate. Member of the Python / R purifiers \n` +
                    `fictitious society. I can speak really loud`
                  }
                  social={{
                    twitter: '@andrei_rukavina',
                    github: 'https://github.com/arukavina',
                    linkedin: '/andreirukavina',
                  }}
                />
              </Element>
            </div>
          </Element>
          <div className="aboutUsSecondSectionDataContainer">
            <Element name="solana" className="aboutUsElementContainer">
              <InfoBox
                name={'SOLANA SIERRA'}
                type={'secondary'}
                roles={'UXD'}
                image={solanaSierraImg}
                description={
                  `Interaction designer. Expert in User\n` +
                  `Experience and User Interface\n` +
                  `Member of the Interaction Design foundation.\n` +
                  `Ravenclaw Potterhead & undercover unicorn.`
                }
                social={{
                  instagram: '@solisierra',
                  linkedin: '/solanasierra',

                }}
              />
            </Element>
            <Element name="jonathan" className="aboutUsElementContainer">
              <InfoBox
                name={'JONATHAN PERKES'}
                type={'secondary'}
                roles={'Testing/Coverage'}
                image={jonathanPerkesImg}
                description={
                  `Computer Engineer, Data Scientist. I’ve \n` +
                  `been particularly interested in Fourier Analysis \n` +
                  `and DSP as of late. I once saw the Necronomicon’s \n` +
                  `copy at my university library and I can create \n` +
                  `origami versions of flowers I casually see during \n` +
                  `the day.`
                }
                social={{
                  linkedin: '/jonathan-perkes'
                }}
              />
            </Element>
            <Element name="nicolas" className="aboutUsElementContainer">
              <InfoBox
                name={'NICOLAS CRIBIOLI'}
                type={'secondary'}
                roles={'DevOps'}
                image={nicolasCribioliImg}
                description={
                  `Systems Analyst, SysAdmin, information\n` +
                  `security. Barbecue guru & organizer`
                }
                social={{
                  linkedin: '/nicolas-cribioli',
                }}
              />
            </Element>
            <Element name="radium" className="aboutUsElementContainer">
              <InfoBox
                name={'RADIUM ROCKET'}
                type={'secondary'}
                roles={'Web'}
                image={radiumLogo}
                social={{
                  web: 'http://radiumrocket.com/',
                }}
              />
            </Element>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
