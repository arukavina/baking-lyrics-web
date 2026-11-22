import React, { Component } from 'react'
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
  componentWillUnmount() {
    // The form values used to be destroyed on unmount by redux-form
    this.props.resetWizard()
  }

  state = {
    acceptedTandC: false,
    touched: {
      fistThreeWords: false,
      termsAndConditions: false,
    },
  };

  required = value => (value || typeof value === 'number' ? undefined : 'Required')
  requiredTandC = value => (value ? undefined : 'Accept terms and conditions')
  minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
  minLength10 = this.minLength(10)

  validateFistThreeWords = value => this.required(value) || this.minLength10(value)
  validateTermsAndConditions = value => (value ? undefined : 'Required')

  touch = name => this.setState(({ touched }) => ({ touched: { ...touched, [name]: true } }))

  handleSubmit = (event) => {
    event.preventDefault()
    const { fistThreeWords, termsAndConditions, artistId, generateSong } = this.props
    this.setState({ touched: { fistThreeWords: true, termsAndConditions: true } })
    const fistThreeWordsError = this.validateFistThreeWords(fistThreeWords)
    // The checkbox is only validated while it is rendered
    const termsAndConditionsError = this.state.acceptedTandC
      ? undefined
      : this.validateTermsAndConditions(termsAndConditions)
    if (fistThreeWordsError || termsAndConditionsError) return
    termsAndConditions && localStorage.setItem('acceptedTandC', termsAndConditions)
    generateSong(fistThreeWords, '100', artistId)
  }

  renderField = (field) => {
    const {
      title,
      placeholder,
      name,
      value,
      onChange,
      onBlur,
      touched,
      error,
    } = field
    return (
      <div className="inputContainer">
        <span className="inputTitle">{title}</span>
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
      name,
      id,
      checked,
      onChange,
      onBlur,
      touched,
      error,
    } = field
    return (
      <div>
        <label class="checkbox">
          <input name={name} id={id} checked={checked} onChange={onChange} onBlur={onBlur} type="checkbox" className={touched && error ? 'errorInput' : ''} />
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
    const { search, isFetching, errorMsg, fistThreeWords, termsAndConditions, changeField } = this.props
    const { touched } = this.state

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
              {this.renderField({
                title: "Give the AI a sentence to elaborate on. The more you write the better",
                name: "fistThreeWords",
                placeholder: "Don’t be cheap, write at least 6 words",
                value: fistThreeWords || '',
                onChange: event => changeField('fistThreeWords', event.target.value),
                onBlur: () => this.touch('fistThreeWords'),
                touched: touched.fistThreeWords,
                error: this.validateFistThreeWords(fistThreeWords),
              })}
              {
                !this.state.acceptedTandC && (
                  <div className="termsAndConditions">
                    <span htmlFor="termsAndConditions">I have read and accept the <a href="/terms-and-conditions" target="_blank" >Terms and Conditions</a></span>
                    {this.renderCheckboxField({
                      name: "termsAndConditions",
                      id: "termsAndConditions",
                      checked: !!termsAndConditions,
                      onChange: event => changeField('termsAndConditions', event.target.checked),
                      onBlur: () => this.touch('termsAndConditions'),
                      touched: touched.termsAndConditions,
                      error: this.validateTermsAndConditions(termsAndConditions),
                    })}
                  </div>
                )
              }

              {errorMsg && <span className="errorMsg">Failed trying to get a song</span>}
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Link className="tryButton" to="song" onClick={this.handleSubmit}>{'GENERATE'}</Link>
        </div>
        <Footer />
      </div>
    )
  }
}
