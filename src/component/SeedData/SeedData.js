import React, { Component } from 'react'
import logoRed from '../../static/images/logoRed.png'
import { Field } from "redux-form"
import { Link } from 'react-router-dom'
import loading from '../../static/images/loading.png'
import './SeedData.css'

export default class extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.songId) return this.props.history.push(`song/${nextProps.songId}`)
  }

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
    const { search, handleSubmit, isFetching } = this.props
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
          </div>
        </div>
        <div className="buttonContainer">
          <Link className="tryButton" to="song" onClick={handleSubmit}>{'GENERATE'}</Link>
        </div>
        {
          isFetching 
          ? (<div className="isFetching">
              <img className="imgLoading" src={loading} alt="loading" />
              <span className="textLoading">
                baking lyrics...
              </span>
            </div>)
          : null
        }
      </div>
    )
  }
}
