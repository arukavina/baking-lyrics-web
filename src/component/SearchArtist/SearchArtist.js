import React, { Component } from 'react'
import { Field } from "redux-form"
import { Link } from "react-router-dom"
import debounce from "lodash/debounce"
import logoRed from '../../static/images/logoRed.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchArtist.css'


const renderSearchField = field => <input {...field.input} maxLength={40} type="text" placeholder={field.placeholder}/>

export default class extends Component {
  componentDidMount () {
    const {
      changeSearch,
      getArtists,
      clearSong,
    } = this.props
    getArtists()
    clearSong()
    changeSearch('')
  }
  debouncedOnChange = debounce(this.onChange, 1000).bind(this)

  listArtists = () => {
    const { artists } = this.props
    artists && artists.map(art => (
      <span key={art.id}>
        {art.name}
      </span>
    ))
  }

  onChange(event) {
    const { getArtists } = this.props
    event.target.value.length > 2 ? getArtists(event.target.value.trimEnd()) : getArtists()
  }

  onClickHandler = (name, artistId) => {
    const {
      changeSearch,
      history,
    } = this.props
    changeSearch(name, artistId)
    history.push('start-text')
  }

  artistList () {
    const { search, artists, isFetching } = this.props
    if (artists.length !== 0) {
      return artists.map((item, index) => (
          (index <= 15) &&
            <div
              style={{background: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${item.coverImg}) no-repeat center center/contain`}}
              onClick={() => this.onClickHandler(item.name, item.id)}
              key={index} className="artistContainer"
            >
              <span className="artistName">
                {item.name}
              </span>
            </div>
        )
      )
    } else if (!isFetching) {
      return search ? (
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
      )
      : (
        <div className="notFoundArtistAlertContainer">
          <span className="notFoundArtistAlert">
            Oops! We found no artist
          </span>
        </div>
      )
    } else {
      return (
        <div className="notFoundArtistAlertContainer">
          <span className="notFoundArtistAlert">
            Retreiving artists...
          </span>
        </div>
      )
    }
  }

  render () {
    const { search, artists, total, getArtists } = this.props
    
    return(
      <div className="searchArtistComponentcontainer">
        <div className="regularHeaderContainer">
          <Link className="regularHeader" to={'/'}>
            <img className="logoRed" src={logoRed} alt="baking logo" />
          </Link>
        </div>
        <div className="searchArtistContainer">
          <div className="searchArtist">
            <div className="searchBar">
              <FontAwesomeIcon icon={faSearch} size="lg"/>
              <Field 
                component={renderSearchField}
                onChange={this.debouncedOnChange}
                placeholder="Search for an artist or a band" 
                name="search"
              />
              <div onClick={() => {
                getArtists()
                this.props.change('search', '')
              }}>
                <FontAwesomeIcon icon={faSync} size="lg" title="Refresh list"/>
              </div>
            </div>
            {total && <span className="totalArtists">{`Searching in a database of ${total} artists`}</span>}
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
              {this.artistList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
