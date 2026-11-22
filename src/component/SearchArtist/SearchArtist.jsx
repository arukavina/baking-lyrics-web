import React, { useEffect, useMemo } from 'react'
import { Link } from "react-router"
import debounce from "lodash/debounce"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMagnifyingGlass, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { MIN_SEARCH_LENGTH, artistDisplayName } from '../../helpers/api'
import Container from '../shared/Container'
import './SearchArtist.css'

const MAX_ARTISTS = 16
const SKELETON_COUNT = 8

// "Beyonce Knowles" -> "BK", shown when Wikipedia has no picture
const initials = name => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(word => word[0].toUpperCase())
  .join('')

const ArtistCard = ({ artist, onPick }) => {
  const name = artistDisplayName(artist)
  return (
    <li>
      <Link to="/start-text" className="card artist-card" onClick={() => onPick(name, artist.id)}>
        <div className="artist-card__media">
          {artist.coverImg
            ? <img src={artist.coverImg} alt="" loading="lazy" />
            : <span className="artist-card__initials" aria-hidden="true">{initials(name)}</span>}
        </div>
        <div className="artist-card__body">
          <span className="eyebrow">{artist.genre || 'Artist'}</span>
          <h2 className="card-title artist-card__name">{name}</h2>
          <span className="artist-card__cta">
            Write like them
            <FontAwesomeIcon icon={faArrowRight} className="artist-card__arrow" />
          </span>
        </div>
      </Link>
    </li>
  )
}

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

  const onRefresh = () => {
    // A pending search would otherwise replace the refreshed list
    debouncedSearch.cancel()
    getArtists()
    setSearch('')
  }

  const query = (search || '').trim()
  const isSearching = query.length >= MIN_SEARCH_LENGTH
  const shown = artists.slice(0, MAX_ARTISTS)
  let statusText = ''
  if (shown.length !== 0) {
    statusText = isSearching ? `Showing results for "${query}"` : 'A random pick from the database'
  }

  const results = () => {
    if (shown.length !== 0) {
      return (
        <ul className="artist-grid">
          {shown.map(item => (
            <ArtistCard key={item.id} artist={item} onPick={changeSearch} />
          ))}
        </ul>
      )
    }
    if (isFetching) {
      return (
        <>
          <p className="sr-only" role="status">Retrieving artists...</p>
          <ul className="artist-grid" aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <li key={index} className="artist-skeleton" />
            ))}
          </ul>
        </>
      )
    }
    if (errorMsg) {
      return <p className="notice" role="alert">{errorMsg}</p>
    }
    return isSearching ? (
      <div className="empty-state">
        <p>{`No results for "${query}"`}</p>
        <p>Check the spelling, or try a band name instead of a member.</p>
      </div>
    ) : (
      <div className="empty-state">
        <p>No artists to show yet</p>
        <p>{`Type at least ${MIN_SEARCH_LENGTH} letters to search the whole database.`}</p>
      </div>
    )
  }

  return (
    <section className="section section--first search-page">
      <Container>
        <header className="search-head fade-up">
          <span className="eyebrow">Step 1 of 2</span>
          <h1 className="page-title">Pick an <span className="accent">artist</span></h1>
          <p className="lead">
            The machine writes in the style of the artist you choose. Pick one of these, or search for your favorite.
          </p>
        </header>

        <div className="search-bar">
          <label htmlFor="artist-search" className="sr-only">Search for an artist or a band</label>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-bar__icon" />
          <input
            id="artist-search"
            className="input search-bar__input"
            value={search || ''}
            onChange={onSearchChange}
            maxLength={40}
            type="text"
            placeholder="Search for an artist or a band"
            name="search"
            autoComplete="off"
          />
          <button type="button" className="search-bar__refresh" aria-label="Refresh list" title="Refresh list" onClick={onRefresh}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>

        <div className="search-status">
          {statusText && <p className="meta">{statusText}</p>}
          {total
            ? <p className="meta search-status__total">{`Searching in a database of ${total} ${total === 1 ? 'artist' : 'artists'}`}</p>
            : null}
        </div>

        <div className="search-results">
          {results()}
        </div>
      </Container>
    </section>
  )
}
