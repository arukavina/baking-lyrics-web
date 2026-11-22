import React, { useEffect } from 'react'
import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { artistDisplayName, trackShare } from '../../helpers/api'
import Container from '../shared/Container'
import './GeneratedSong.css'

// "ego-remix(Artificial)" -> "ego remix (Artificial)"
const formatTitle = title => (title
  ? title.replace(/-/g, ' ').replace(/\s*\(Artificial\)$/, ' (Artificial)')
  : '')

// Blank lines separate verses
const toVerses = lyrics => (lyrics || '')
  .split(/\n\s*\n/)
  .map(verse => verse.trim())
  .filter(Boolean)

const OneMoreTime = () => (
  <Link className="btn-primary" to="/artist">
    One more time
    <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
  </Link>
)

export default function GeneratedSong(props) {
  const { songId } = useParams()
  const { getGeneratedSong } = props
  const loadedSongId = props.generatedSong.lyrics ? String(props.generatedSong.id) : null

  useEffect(() => {
    // Skip the request when the song was just generated on the previous page
    if (loadedSongId !== String(songId)) {
      getGeneratedSong(songId)
    }
  }, [songId, loadedSongId, getGeneratedSong])

  // Counts the share (fire and forget), then opens the network's share page
  // Uses the id from the URL: the stored song may still be the previous one while the next loads
  const countShare = network => trackShare(songId, network)

  const openURLInPopup = (url, network) => {
    countShare(network)
    window.open(
      `${url}http://bakinglyrics.com/song/${songId}`,
      "pop",
      "width=600, height=400, scrollbars=no"
    );
  }

  const {
    generatedSong: {
      artificialTitle: {
        title
      },
      baseArtist,
      lyrics
    },
    background,
    isFetching,
    errorMsg,
  } = props
  const name = artistDisplayName(baseArtist)
  const showError = !isFetching && !!errorMsg
  const verses = toVerses(lyrics)

  if (showError) {
    return (
      <section className="section section--first song-page">
        <Container>
          <header className="song-head fade-up">
            <span className="eyebrow">Generated lyrics</span>
            <h1 className="page-title">This batch got burnt</h1>
          </header>
          <p className="notice song-error" role="alert">{errorMsg}</p>
          <div className="song-error__actions">
            <OneMoreTime />
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="section section--first song-page">
      <Container>
        <header className="song-head fade-up">
          <div className="song-thumb" aria-hidden="true">
            {background && <img src={background} alt="" />}
          </div>
          <span className="eyebrow">Generated lyrics</span>
          {title
            ? <h1 className="page-title song-title">{formatTitle(title)}</h1>
            : <h1 className="page-title song-title song-title--loading">Fresh out of the oven...</h1>}
          {name && <p className="meta song-based">Based on <span className="song-based__artist">{name}</span></p>}
        </header>

        <div className="song-layout">
          <article className="song-lyrics" aria-busy={verses.length === 0 ? 'true' : undefined}>
            {verses.length !== 0
              ? verses.map((verse, index) => <p key={index}>{verse}</p>)
              : (
                <div className="song-lyrics__placeholder" aria-hidden="true">
                  {[92, 78, 85, 64, 88, 72].map((width, index) => (
                    <span key={index} style={{ width: `${width}%` }} />
                  ))}
                </div>
              )}
          </article>

          <aside className="song-aside">
            <div className="song-share">
              <span className="label">Share these lyrics</span>
              <div className="song-share__buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  aria-label="Share on Facebook"
                  onClick={() => openURLInPopup('https://www.facebook.com/sharer/sharer.php?u=', 'facebook')}
                >
                  <FontAwesomeIcon icon={faFacebook} className="btn-icon" />
                  Facebook
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  aria-label="Share on X"
                  onClick={() => openURLInPopup('https://twitter.com/intent/tweet?text=Take%20a%20look%20at%20this%20new%20song:%20', 'twitter')}
                >
                  <FontAwesomeIcon icon={faXTwitter} className="btn-icon" />
                  X
                </button>
                <a
                  className="btn-secondary"
                  aria-label="Share on WhatsApp"
                  href={`https://api.whatsapp.com/send?text=Check%20this%20out!%20I%20just%20generated%20the%20following%20lyrics%20using%20Artificial%20Intelligence:%0A${document.URL}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => countShare('whatsapp')}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="btn-icon" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="song-again">
              <p className="meta">Want another take?</p>
              <OneMoreTime />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
