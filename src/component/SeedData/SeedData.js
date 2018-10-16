import React, { Component } from 'react'
import logoRed from '../../static/images/logoRed.png'
import { Field } from "redux-form"
import { Link } from 'react-router-dom'
import './SeedData.css'

export default class extends Component {
  renderField = (field) => {
    const {
      title,
      placeholder,
    } = field
    return(
      <div className="inputContainer">
        <span className="inputTitle">{title}</span>
        <input
          {...field.input}
          className='input'
          placeholder={placeholder}
        />
      </div>
    )
  }
  render() {
    const { search } = this.props
    return (
      <div className="SeedDataContainer">
        <div className="header">
          <img className="logoRed" src={logoRed} alt="baking logo" />
        </div>
        <div className="formContainer">
          <div className="form">
            <div className="headerContainer">
              <span className="headerSubTitle">
                {'CREATE RANDOM LYRICS LIKE'}
              </span>
              <span className="headerTitle">
                {search}
              </span>
            </div>
            <div className="inputContainer">
              <Field
                component={this.renderField}
                title="Start song with"
                name="fistThreeWords"
                placeholder="Type the first three words of your lyrics"
              />
            </div>
            <div className="inputContainer">
              <Field
                component={this.renderField}
                title="Title"
                placeholder="Type the title of the song"
                name="songTitle" />
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Link className="tryButton" to="song">{'GENERATE'}</Link>
        </div>
        {/* <div className={"SeedDataContainer", "isFetching"}>
          <img className="imgLoading" src={loading} alt="loading" />
          <span className="textLoading">
            baking lyrics...
          </span>
        </div> */}
      </div>
    )
  }
}
