import React, { Component } from 'react'
import { Field } from "redux-form"
// import { Link } from 'react-router-dom'

import logoRed from '../../static/images/logoRed.png'
import serchImage from '../../static/images/find.png'
import fooImage from '../../static/images/foo.png'
import './SearchArtist.css'

const renderField = (field) => (
  <div className="searchBar">
    <img className="serchImage" src={serchImage} alt="Search" />
    <input {...field.input} maxLength={40} type="text" placeholder="Search for a band"/>
  </div>
)

const artists = [
  {
    id: 1,
    name: "ABBA",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 2,
    name: "Ace Of Base",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 3,
    name: "Adam Sandler",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 4,
    name: "Adele",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 5,
    name: "Aerosmith",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 6,
    name: "Air Supply",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 7,
    name: "Aiza Seguerra",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 8,
    name: "Alabama",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 9,
    name: "Alan Parsons Project",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 10,
    name: "Aled Jones",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 11,
    name: "Alice Cooper",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 12,
    name: "Alice In Chains",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 13,
    name: "Alison Krauss",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 14,
    name: "Allman Brothers Band",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 15,
    name: "Alphaville",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 16,
    name: "America",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 17,
    name: "Amy Grant",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 18,
    name: "Andrea Bocelli",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 19,
    name: "Andy Williams",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  },
  {
    id: 20,
    name: "Annie",
    country: "US",
    formation_date: "1987-12-05T00:00:00",
    genre: "Pop"
  }
]

export default class extends Component {
  componentDidMount () {
    // fetch('http://localhost:5000/api/v1/artists/')
    // .then(artists => this.setState({ artists }))
    this.setState({ artists })
  }

  state = {
    artists: []
  }  

  listArtists = () => {
    const { artists } = this.state
    artists && artists.map(art => (
      <span key={art.id}>
        {art.name}
      </span>
    ))
  }

  onClickHandler = (name) => {
    const {
      changeSearch,
      history,
    } = this.props
    changeSearch(name)
    history.push('start-text')
  }
    
  render () {
    const { search } = this.props
    const { artists } = this.state
    return(
      <div className="searchArtistComponentcontainer">
        <img className="logoRed" src={logoRed} alt="baking logo" />
        <div className="searchArtistContainer">
          <div className="searchArtist">
            <form>
              <Field component={renderField} name="search"/>
            </form>
            <div className="showingResultsContainer">
              {
                (search && artists.length !== 0) &&
                <p className="showingResults">Showing results for "<span>{search}</span>"</p>
              }
            </div>
            <div className="listArtistContainer">
              {
                artists.length !== 0
                ? artists.map((item, index) => {
                    return (
                      (index <= 7) &&
                        <div onClick={() => this.onClickHandler(item.name)} key={index} className="artistContainer">
                          <img className="artistLogo" src={fooImage} alt="foo logo" />
                          <span className="artistName">
                            {item.name}
                          </span>
                        </div>
                    )
                  })
                : <div className="notFoundArtistAlertContainer">
                    <span className="notFoundArtistAlert">
                      Oops! We found no results for " 
                    </span>
                    <span className="notFoundArtistAlertTitle notFoundArtistAlert">
                      {search}
                    </span>
                    <span className="notFoundArtistAlert">
                      "
                    </span>
                  </div>
              }
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
