import React, { Component } from 'react'
import { Field } from "redux-form"
import { Link } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import loading from '../../static/images/loading.png'
import './SeedData.css'

export default class extends Component {
  componentDidMount() {
    if (!this.props.search) return this.props.history.push(`artist`)
    const acceptedTandC = localStorage.getItem('acceptedTandC') === 'true';
    this.setState({ acceptedTandC });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.songId) return this.props.history.push(`song/${nextProps.songId}`)
  }

  state = {
    acceptedTandC: false
  };

  required = value => (value || typeof value === 'number' ? undefined : 'Required')
  requiredTandC = value => (value ? undefined : 'Accept terms and conditions')
  minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
  minLength10 = this.minLength(10)

  renderField = (field) => {
    const {
      title,
      placeholder,
      meta: { touched, error }
    } = field
    return (
      <div className="inputContainer">
        <span className="inputTitle">{title}</span>
        <input
          {...field.input}
          className={touched && error ? 'errorInput' : 'input'}
          placeholder={placeholder}
        />
        {touched &&
          error && <span className="errorMsg">{error}</span>}
      </div>
    )
  }

  renderCheckboxField = (field) => {
    const {
      meta: { touched, error }
    } = field
    return (
      <div>
        <label class="checkbox">
          <input {...field.input} type="checkbox" className={touched && error ? 'errorInput' : ''} />
          <span></span>
        </label>
        {touched && error && <span className="errorMsg">{error}</span>}
      </div>
    )
  }

  sectionStyle = {
    background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 100%), url("${this.props.background}") no-repeat center top fixed`,
    backgroundSize: 'cover'
  };

  render() {
    const { search, handleSubmit, isFetching, errorMsg } = this.props

    return (
      <div className="containerLayout seedDataContainer" style={this.sectionStyle}>
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
        <div className="regularHeaderContainer">
          <Link className="regularHeader" to={'/'}>
            <img className="logoRed" src={logoRed} alt="baking logo" />
          </Link>
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
                title="Give the AI a sentence to elaborate on. The more you write the better"
                name="fistThreeWords"
                placeholder="Don’t be cheap, write at lest 6 words"
                validate={[this.required, this.minLength10]}
              />
              {
                !this.state.acceptedTandC && (
                  <div className="termsAndConditions">
                    <span htmlFor="termsAndConditions">I have read and accept the <a href="/terms-and-conditions" target="_blank" >Terms and Conditions</a></span>
                    <Field name="termsAndConditions" id="termsAndConditions" component={this.renderCheckboxField} required />
                  </div>
                )
              }

              {errorMsg && <span className="errorMsg">Failed trying to get a song</span>}
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Link className="tryButton" to="song" onClick={handleSubmit}>{'GENERATE'}</Link>
        </div>
        <Footer />
      </div>
    )
  }
}
