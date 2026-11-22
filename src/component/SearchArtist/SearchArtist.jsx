import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from "react-router"
import debounce from "lodash/debounce"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faSearch } from '@fortawesome/free-solid-svg-icons'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import { MIN_SEARCH_LENGTH, artistDisplayName } from '../../helpers/api'
import './SearchArtist.css'


export default function SearchArtist(props) {
  const {
    search,
    artists,
    total,
    isFetching,
    errorMsg,
    getArtists,
    getArtistsTotal,
    clearSong,
    changeSearch,
    setSearch,
  } = props
  const navigate = useNavigate()

  useEffect(() => {
    getArtists()
    getArtistsTotal()
    clearSong()
    changeSearch('')
    // The action creators are bound once by connect, so this runs on mount only
  }, [getArtists, getArtistsTotal, clearSong, changeSearch])

  const debouncedSearch = useMemo(() => debounce((value) => {
    const query = value.trim()
    if (query.length >= MIN_SEARCH_LENGTH) getArtists(query)
    else getArtists()
  }, 1000), [getArtists])
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch])

  const onSearchChange = (event) => {
    const { value } = event.target
    setSearch(value)
    debouncedSearch(value)
  }

  const onClickHandler = (name, artistId) => {
    changeSearch(name, artistId)
    navigate('/start-text')
  }

  const artistList = () => {
    if (artists.length !== 0) {
      return artists.map((item, index) => (
        (index <= 15) &&
        <div
          style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${item.coverImg}) no-repeat center center/contain` }}
          onClick={() => onClickHandler(artistDisplayName(item), item.id)}
          key={item.id} className="artistContainer"
        >
          <span className="artistName">
            {artistDisplayName(item)}
          </span>
        </div>
      )
      )
    } else if (!isFetching && errorMsg) {
      return (
        <div className="notFoundArtistAlertContainer">
          <span className="notFoundArtistAlert">
            {errorMsg}
          </span>
        </div>
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
            &quot;
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
            onChange={onSearchChange}
            maxLength={40}
            type="text"
            placeholder="Search for an artist or a band"
            name="search"
          />
          <div onClick={() => {
            // A pending search would otherwise replace the refreshed list
            debouncedSearch.cancel()
            getArtists()
            setSearch('')
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
          {artistList()}
        </div>
      </div>
      <Footer />
    </div>
  )
}
