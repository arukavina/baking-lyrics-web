import React, { Component } from 'react'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink } from "react-router-dom";
import InfoBox from './InfoBox'
import logoRed from '../../static/images/logoRed.png'
import menu from '../../static/images/menu.png'
import adrianaMauliniImg from '../../static/images/adrianaMaulini.png'
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

  lineTitle = (title) => {
    return(
      <div className="aboutUsSectionSeparatorContainer">
        <div className="aboutUsSectionSeparator"/>
      </div>
    )
  }

  menu = (classSelected) => {
    return(
      <div className={classSelected}>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="artificialIntelligence"
            spy={true}
            offset={-200}
            smooth={true}
            duration={500}
          >
            {'ARTIFICIAL INTELLIGENCE'}
          </Link>
        </span>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="backend"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
          >
            {'BACKEND'}
          </Link>
        </span>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="design"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
          >
            {'DESIGN'}
          </Link>
        </span>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="testing"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
          >
            {'TESTING'}
          </Link>
        </span>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="devOps"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
          >
            {'DEV OPS'}
          </Link>
        </span>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active"
            to="frontend"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
          >
            {'FRONTEND'}
          </Link>
        </span>
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
      <div className="aboutUsContainer">
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
          <Element name="artificialIntelligence" className="aboutUsElementContainer">
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
                  linkedin: '/sergio-banchero-4828bb77',
                }}
              />
              <Element name="backend" >
                <InfoBox
                  name={'ANDREI RUKAVINA'}
                  type={'primary'}
                  roles={'AI, Backend, DevOps'}
                  image={andreiRukavinaImg}
                  description={
                    `Software Engineer, Data scientist& InfoViz.\n` +
                    `enthusiastic with a fantastic taste for coffee.\n` +
                    `Member of the Python/Rpurifiers society.`
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
            <Element name="design" className="aboutUsElementContainer">
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
            <Element name="testing" className="aboutUsElementContainer">
              <InfoBox
                name={'ADRIANA MAULINI'}
                type={'secondary'}
                roles={'Testing/Coverage'}
                image={adrianaMauliniImg}
                description={
                  `Software engineer, c# and now "whatever it \n` +
                  `comes" developer, master in engineering \n` +
                  `candidate, because just one thesis is not \n` +
                  `enough to cry, and of course a senior "crazy \n` +
                  `cat lady"`
                }
                social={{
                  linkedin: '/adriana-maulini-b-226278a4',

                }}
              />
            </Element>
            <Element name="devOps" className="aboutUsElementContainer">
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
            <Element name="frontend" className="aboutUsElementContainer">
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
      </div>
    )
  }
}
