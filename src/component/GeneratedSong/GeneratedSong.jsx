import React, { useEffect } from 'react'
import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { artistDisplayName } from '../../helpers/api'
import './GeneratedSong.css'

// "ego-remix(Artificial)" -> "ego remix (Artificial)"
const formatTitle = title => (title
  ? title.replace(/-/g, ' ').replace(/\s*\(Artificial\)$/, ' (Artificial)')
  : '')

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

  const openURLInPopup = (url) => {
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

  const sectionStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("${background}") no-repeat center center/cover`
  };
  
  return (
    <div className="generatedSongContainer" style={sectionStyle}>
      <div className="generatedSongHeader">
        <div className="bandNameContainer">
          <span className="bandNameTitle">
            {'LYRICS BASED IN'}
          </span>
          <span className="bandNameTitle montserratTextBold">
            {name}
          </span>
        </div>
      </div>
      <div className="textSongFlexContainer">
        <div className="textSongContainer">
          {showError ? (
            <p className="textSong" role="alert">
              {errorMsg}
            </p>
          ) : (
            <>
              <span className="textSongTitle">
                {formatTitle(title)}
              </span>
              <p className="textSong">
                {lyrics}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="generatedSongFooterContainer">
        <span className="shareTitle">
          {'SHARE'}
        </span>
        <div className="socialContainer">
          <a
            onClick={() =>
              openURLInPopup('https://www.facebook.com/sharer/sharer.php?u=')
            }
            className="link"
            
          >
            <FontAwesomeIcon icon={faFacebook} size="3x" color="white" />
          </a>
          <a
            onClick={() =>
              openURLInPopup('https://twitter.com/intent/tweet?text=Take%20a%20look%20at%20this%20new%20song:%20')
            }
            className="link"
          >
            <FontAwesomeIcon icon={faTwitterSquare} size="3x" color="white" />
          </a>
          <a href={`https://api.whatsapp.com/send?text=Check%20this%20out!%20I%20just%20generated%20the%20following%20lyrics%20using%20Artificial%20Intelligence:%0A${document.URL}`} target="_blank" rel="noreferrer" className="link">
            <FontAwesomeIcon icon={faWhatsapp} size="3x" color="white" />
          </a>
        </div>
        <div className="tryItText">Try it</div>
        <Link className="oneMoreTime tryButton" to="/artist" >{'ONE MORE TIME'}</Link>
      </div>
    </div>
  )
}
