import React, { Component } from 'react'
import { Link } from "react-router-dom"
import debounce from "lodash/debounce"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faSearch } from '@fortawesome/free-solid-svg-icons'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import './SearchArtist.css'


export default class extends Component {
  componentDidMount() {
    const {
      changeSearch,
      getArtists,
      clearSong,
    } = this.props
    getArtists()
    clearSong()
    changeSearch('')
  }
  debouncedSearch = debounce(this.searchArtists, 1000).bind(this)

  onSearchChange = (event) => {
    const { value } = event.target
    this.props.setSearch(value)
    this.debouncedSearch(value)
  }

  listArtists = () => {
    const { artists } = this.props
    artists && artists.map(art => (
      <span key={art.id}>
        {art.name}
      </span>
    ))
  }

  searchArtists(value) {
    const { getArtists } = this.props
    value.length > 2 ? getArtists(value.trimEnd()) : getArtists()
  }

  onClickHandler = (name, artistId) => {
    const {
      changeSearch,
      history,
    } = this.props
    changeSearch(name, artistId)
    history.push('start-text')
  }

  artistList() {
    const { search, artists, isFetching } = this.props
    if (artists.length !== 0) {
      return artists.map((item, index) => (
        (index <= 15) &&
        <div
          style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${item.coverImg}) no-repeat center center/contain` }}
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

  render() {
    const { search, artists, total, getArtists } = this.props

    return (
      <div className="containerLayout regularContainerImage">
        <div className="regularHeader">
          <Link to={'/'}>
            <img className="logoRed" src={logoRed} alt="baking logo" />
          </Link>
        </div>
        <div className="searchArtist">
          <div className="searchBar">
            <FontAwesomeIcon icon={faSearch} color="black" size="lg" />
            <input
              value={search || ''}
              onChange={this.onSearchChange}
              maxLength={40}
              type="text"
              placeholder="Search for an artist or a band"
              name="search"
            />
            <div onClick={() => {
              getArtists()
              this.props.setSearch('')
            }}>
              <FontAwesomeIcon icon={faSync} color="black" size="lg" title="Refresh list" />
            </div>
          </div>
          {total ? <span className="totalArtists">{`Searching in a database of ${total} artists`}</span> : ''}
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
        <Footer />
      </div>
    )
  }
}
