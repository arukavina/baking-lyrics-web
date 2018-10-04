import React, { Component } from 'react'
import { Field } from "redux-form"
// import { Link } from 'react-router-dom'

import logoRed from '../../static/images/logoRed.png'
import './SearchArtist.css'

const renderField = (field) => (
  <div className="searchBar">
    <input {...field.input} type="text" placeholder="Search for a band"/>
  </div>
)

export default class extends Component {
  componentDidMount () {
    fetch('http://localhost:5000/api/v1/artists/')
    .then(artists => this.setState({ artists }))
  }

  state = {
    artists: []
  }

  listArtists = () => 
    this.state.artists && this.state.artists.map(art => (
      <span key={art.id}>
        {art.name}
      </span>
    ))

    
  render () {
    return(
      <div className="searchArtistContainer">
        <img className="logoRed" src={logoRed} alt="baking logo" />
        <form className="homeTitle">
          <Field component={renderField} name="search" />
        </form>
        <div>
          <p>Showing results for "<span></span>" </p>
          {this.listArtists()}
        </div>
      </div>
    )
  }
}
