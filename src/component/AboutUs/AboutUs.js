import React, { Component } from 'react'
import { Link, Element } from 'react-scroll'
import InfoBox from './InfoBox'
import logoRed from '../../static/images/logoRed.png'
import menu from '../../static/images/menu.png'
import adrianaMauliniImg from '../../static/images/adrianaMaulini.png'
import andreiRukavinaImg from '../../static/images/andreiRukavina.png'
import sergioBancheroImg from '../../static/images/sergioBanchero.png'
import solanaSierraImg from '../../static/images/solanaSierra.png'
import notImg from '../../static/images/notImg.png'

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
        <div className="aboutUsSectionTitleContainer">
          <span className="aboutUsSectionTitle">{title}</span>
        </div>
        <div className="aboutUsSectionSeparator"/>
      </div>
    )
  }

  menu = (classSelected) => {
    return(
      <div className={classSelected}>
        <span className="aboutUsMenuTitle">
          <Link
            activeClass="active" to="artificialIntelligence"
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
          <div className="aboutUsLogoContainer">
            <span className="aboutUsTitleImage">WE CREATED</span>
            <img className="aboutUsLogoRed" src={logoRed} alt="baking logo" />
          </div>
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
            {this.lineTitle('ARTIFICIAL INTELLIGENCE')}
            <div className="aboutUsSectionDataContainer">
              <InfoBox
                name={'SERGIO BANCHERO'}
                image={sergioBancheroImg}
                description={
                  `Electronics Engineer gone Data Scientist.\n` +
                  `Won't fix what's not broken, but everything\n` +
                  `seems broken to me. Can identify the hex RGB\n` +
                  `of a color just from looking at it.`
                }
                social={{
                  linkedin: '/serigio banchero',
                }}
              />
              <InfoBox
                name={'ANDREI RUKAVINA'}
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
            </div>
          </Element>
          <Element name="design" className="aboutUsElementContainer">
            {this.lineTitle('DESIGN')}
            <div className="aboutUsSectionDataContainer">
              <InfoBox
                name={'SOLANA SIERRA'}
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
            </div>
          </Element>
          <Element name="backend" className="aboutUsElementContainer">
            {this.lineTitle('BACKEND')}
            <div className="aboutUsSectionDataContainer">
              <InfoBox
                name={'ADRIANA MAULINI'}
                image={adrianaMauliniImg}
                description={
                  `Software engineer, c# and now "whatever it \n` +
                  `comes" developer, master in engineering \n` +
                  `candidate, because just one thesis is not \n` +
                  `enough to cry, and of course a senior "crazy \n` +
                  `cat lady"`
                }
                social={{
                  linkedin: '/adriana-maulini-b',

                }}
              />
              <InfoBox
                name={'ANDREI RUKAVINA'}
                image={andreiRukavinaImg}
                description={
                  `Software Engineer, Data scientist & InfoViz \n` +
                  `enthusiastic with a fantastic taste for coffee.\n` +
                  `Member of the Python/R purifiers society.`
                }
                social={{
                  twitter: '@andrei_rukavina',
                  github: 'https://github.com/arukavina',
                  linkedin: '/andreirukavina/',

                }}
              />
            </div>
          </Element>
          <Element name="devOps" className="aboutUsElementContainer">
            {this.lineTitle('DEV OPS')}
            <div className="aboutUsSectionDataContainer">
              <InfoBox
                name={'NICOLAS CRIBOLI'}
                image={notImg}
                description={
                  `Cupcake ipsum dolor sit. Amet cake bonbon\n` +
                  `gummies. Chocolate bar chocolate cake\n` +
                  `powder jelly-o chocolate bar powder.`
                }
                social={{
                  instagram: '@cupcake-ipsum',
                  linkedin: '/cupcake',
                }}
              />
            </div>
          </Element>
          <Element name="frontend" className="aboutUsElementContainer">
            {this.lineTitle('FRONTEND')}
            <div name="frontend" className="aboutUsSectionDataContainer">
              <InfoBox
                name={'NOMBRE/EMPRESA'}
                image={notImg}
                description={
                  `Cupcake ipsum dolor sit. Amet cake bonbon\n` +
                  `gummies. Chocolate bar chocolate cake\n` +
                  `powder jelly-o chocolate bar powder.`
                }
                social={{
                  instagram: '@cupcake-ipsum',
                  linkedin: '/cupcake',
                }}
              />
            </div>
          </Element>
        </div>
      </div>
    )
  }
}
