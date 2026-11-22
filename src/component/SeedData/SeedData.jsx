import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { cleanSeed } from '../../helpers/api'
import Container from '../shared/Container'
import './SeedData.css'

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)

// Validates the seed as it is sent: ten spaces or slashes would otherwise
// pass and silently fall back to the no-seed route.
const validateFistThreeWords = (value) => {
  const seed = cleanSeed(value)
  return required(seed) || minLength10(seed)
}
const validateTermsAndConditions = value => (value ? undefined : 'Please accept the terms to continue')

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
    // One generation at a time: ignore repeated submits while baking
    if (isFetching) return
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

  // Enter generates; the seed is one sentence, so new lines are not kept
  const onSeedKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return
    // Let input methods (IME) confirm their composition with Enter
    if (event.nativeEvent?.isComposing) return
    handleSubmit(event)
  }

  const seedError = touched.fistThreeWords ? validateFistThreeWords(fistThreeWords) : undefined
  const termsError = touched.termsAndConditions ? validateTermsAndConditions(termsAndConditions) : undefined
  const seedDescribedBy = seedError ? 'seed-help seed-error' : 'seed-help'

  return (
    <section className="section section--first seed-page">
      {isFetching && (
        <div className="seed-loading" role="status">
          <span className="seed-loading__dot" aria-hidden="true" />
          <span className="seed-loading__text">Baking lyrics...</span>
          <span className="meta">This can take a few seconds</span>
        </div>
      )}
      <Container>
        <Link to="/artist" className="seed-back">
          <FontAwesomeIcon icon={faArrowLeft} className="seed-back__icon" />
          Pick another artist
        </Link>

        <header className="seed-head fade-up">
          <div className="seed-head__text">
            <span className="eyebrow">Step 2 of 2</span>
            <h1 className="page-title">
              Create random lyrics like <span className="accent">{search}</span>
            </h1>
          </div>
          <div className="seed-thumb" aria-hidden="true">
            {background && <img src={background} alt="" />}
          </div>
        </header>

        <form className="seed-panel" noValidate onSubmit={handleSubmit}>
          <div className="seed-field">
            <label className="label" htmlFor="seed">Your opening line</label>
            <textarea
              id="seed"
              name="fistThreeWords"
              rows={3}
              className="input seed-field__input"
              value={fistThreeWords || ''}
              onChange={event => changeField('fistThreeWords', event.target.value.replace(/[\r\n]+/g, ' '))}
              onKeyDown={onSeedKeyDown}
              onBlur={() => touch('fistThreeWords')}
              placeholder="Don’t be cheap, write at least 6 words"
              aria-invalid={seedError ? 'true' : undefined}
              aria-describedby={seedDescribedBy}
            />
            <p id="seed-help" className="seed-field__help">
              Write at least 6 words. The machine picks up from there, and the more you give it, the better.
            </p>
            {seedError && <p id="seed-error" className="seed-field__error">{seedError}</p>}
          </div>

          {!acceptedTandC && (
            <div className="seed-terms">
              <div className="seed-terms__row">
                <input
                  type="checkbox"
                  id="termsAndConditions"
                  name="termsAndConditions"
                  className="seed-terms__check"
                  checked={!!termsAndConditions}
                  onChange={event => changeField('termsAndConditions', event.target.checked)}
                  onBlur={() => touch('termsAndConditions')}
                  aria-invalid={termsError ? 'true' : undefined}
                  aria-describedby={termsError ? 'terms-error' : undefined}
                />
                <label htmlFor="termsAndConditions">
                  I have read and accept the{' '}
                  <a className="text-link" href="/terms-and-conditions" target="_blank" rel="noreferrer">terms and conditions</a>
                </label>
              </div>
              {termsError && <p id="terms-error" className="seed-field__error">{termsError}</p>}
            </div>
          )}

          {errorMsg && <p className="notice" role="alert">{errorMsg}</p>}

          <div className="seed-actions">
            <Link className="btn-primary" to="/song" onClick={handleSubmit}>
              Generate
              <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
            </Link>
            <span className="meta">About 100 words</span>
          </div>
        </form>
      </Container>
    </section>
  )
}
