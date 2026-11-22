import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Footer from '../shared/Footer/Footer'
import logoRed from '../../static/images/logoRed.png'
import loading from '../../static/images/loading.png'
import './SeedData.css'

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)

const validateFistThreeWords = value => required(value) || minLength10(value)
const validateTermsAndConditions = value => (value ? undefined : 'Required')

const renderField = (field) => {
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

const renderCheckboxField = (field) => {
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
      <label className="checkbox">
        <input name={name} id={id} checked={checked} onChange={onChange} onBlur={onBlur} type="checkbox" className={touched && error ? 'errorInput' : ''} />
        <span></span>
      </label>
      {touched && error && <span className="errorMsg">{error}</span>}
    </div>
  )
}

export default function SeedData(props) {
  const {
    search,
    isFetching,
    errorMsg,
    fistThreeWords,
    termsAndConditions,
    artistId,
    songId,
    background,
    changeField,
    resetWizard,
    generateSong,
  } = props
  const navigate = useNavigate()
  const [acceptedTandC] = useState(() => localStorage.getItem('acceptedTandC') === 'true')
  const [touched, setTouched] = useState({
    fistThreeWords: false,
    termsAndConditions: false,
  })
  // Computed once on mount, like the former class field
  const [sectionStyle] = useState(() => ({
    background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 100%), url("${background}") no-repeat center top fixed`,
    backgroundSize: 'cover'
  }))

  useEffect(() => {
    if (!search) navigate('/artist')
    // The form values used to be destroyed on unmount by redux-form
    return () => resetWizard()
    // Mount and unmount only: re-running it would reset the form mid-edit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Go to the generated song once it arrives (skips the initial render,
  // like the former componentWillReceiveProps)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (songId) navigate(`/song/${songId}`)
  }, [songId, navigate])

  const touch = name => setTouched(current => ({ ...current, [name]: true }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({ fistThreeWords: true, termsAndConditions: true })
    const fistThreeWordsError = validateFistThreeWords(fistThreeWords)
    // The checkbox is only validated while it is rendered
    const termsAndConditionsError = acceptedTandC
      ? undefined
      : validateTermsAndConditions(termsAndConditions)
    if (fistThreeWordsError || termsAndConditionsError) return
    termsAndConditions && localStorage.setItem('acceptedTandC', termsAndConditions)
    generateSong({ artistId, seed: fistThreeWords, numberWords: 100 })
  }

  return (
    <div className="containerLayout seedDataContainer" style={sectionStyle}>
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
            {renderField({
              title: "Give the AI a sentence to elaborate on. The more you write the better",
              name: "fistThreeWords",
              placeholder: "Don’t be cheap, write at least 6 words",
              value: fistThreeWords || '',
              onChange: event => changeField('fistThreeWords', event.target.value),
              onBlur: () => touch('fistThreeWords'),
              touched: touched.fistThreeWords,
              error: validateFistThreeWords(fistThreeWords),
            })}
            {
              !acceptedTandC && (
                <div className="termsAndConditions">
                  <span htmlFor="termsAndConditions">I have read and accept the <a href="/terms-and-conditions" target="_blank" >Terms and Conditions</a></span>
                  {renderCheckboxField({
                    name: "termsAndConditions",
                    id: "termsAndConditions",
                    checked: !!termsAndConditions,
                    onChange: event => changeField('termsAndConditions', event.target.checked),
                    onBlur: () => touch('termsAndConditions'),
                    touched: touched.termsAndConditions,
                    error: validateTermsAndConditions(termsAndConditions),
                  })}
                </div>
              )
            }

            {errorMsg && <span className="errorMsg" role="alert">{errorMsg}</span>}
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <Link className="tryButton" to="/song" onClick={handleSubmit}>{'GENERATE'}</Link>
      </div>
      <Footer />
    </div>
  )
}
