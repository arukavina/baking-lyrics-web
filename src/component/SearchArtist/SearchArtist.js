import React, { Component } from 'react'
import { Field } from "redux-form"
import logoRed from '../../static/images/logoRed.png'
import serchImage from '../../static/images/find.png'
import './SearchArtist.css'

const renderField = (field) => (
  <div className="searchBar">
    <img className="serchImage" src={serchImage} alt="Search" />
    <input {...field.input} maxLength={40} type="text" placeholder={field.placeholder}/>
  </div>
)

export default class extends Component {
  componentDidMount () {
    const {
      changeSearch,
      getArtists,
    } = this.props
    getArtists()
    changeSearch('')
  }

  listArtists = () => {
    const { artists } = this.props
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
    const { search, artists } = this.props
    
    return(
      <div className="searchArtistComponentcontainer">
        <img className="logoRed" src={logoRed} alt="baking logo" />
        <div className="searchArtistContainer">
          <div className="searchArtist">
            <form>
              <Field component={renderField} placeholder="Search for a band" name="search"/>
            </form>
            <div className="showingResultsContainer">
              {
                (search && artists.length !== 0) &&
                <p className="showingResults">
                  {'Showing results for "'}
                  <span>
                    {search}
                  </span>
                  {'"'}
                </p>
              }
            </div>
            <div className="listArtistContainer">
              {
                artists.length !== 0
                ?
                artists.map((item, index) => {
                  
                    return (
                      (index <= 7) &&
                        <div
                          onClick={() => this.onClickHandler(item.name)}
                          key={index} className="artistContainer"
                        >
                          {item.coverImg && <img className="artistLogo" src={item.coverImg} alt="foo logo" />}
                          <span className="artistName">
                            {item.name}
                          </span>
                        </div>
                    )
                  })
                :
                  <div className="notFoundArtistAlertContainer">
                    <span className="notFoundArtistAlert">
                      {'Oops! We found no results for "'}
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
