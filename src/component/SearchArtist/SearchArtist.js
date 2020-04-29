import React, { Component } from 'react'
import { Field } from "redux-form"
import { Link } from "react-router-dom";
import debounce from "lodash/debounce"
import logoRed from '../../static/images/logoRed.png'
import serchImage from '../../static/images/find.png'
import './SearchArtist.css'
import { clearSong } from '../../redux/modules/song/actions';

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
      clearSong,
    } = this.props
    getArtists()
    clearSong()
    changeSearch('')
  }
  debouncedOnChange = debounce(this.onChange, 1000).bind(this);

  listArtists = () => {
    const { artists } = this.props
    artists && artists.map(art => (
      <span key={art.id}>
        {art.name}
      </span>
    ))
  }

  onChange(event, newValue, previousValue) {
    const { getArtists } = this.props;
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
          (index <= 7) &&
            <div
              onClick={() => this.onClickHandler(item.name, item.id)}
              key={index} className="artistContainer"
            >
              {item.coverImg && <img className="artistLogo" src={item.coverImg} alt="foo logo" />}
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
    const { search, artists } = this.props
    
    return(
      <div className="searchArtistComponentcontainer">
        <Link className="header" to={'/'}>
          <img className="logoRed" src={logoRed} alt="baking logo" />
        </Link>
        <div className="searchArtistContainer">
          <div className="searchArtist">
            <form>
              <Field 
                component={renderField} 
                onChange={this.debouncedOnChange}
                placeholder="Search for a band" 
                name="search"
              />
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
              {this.artistList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
