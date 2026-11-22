import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import './InfoBox.css'

// Known networks, in display order
const NETWORKS = [
  { key: 'twitter', label: 'X', icon: faXTwitter },
  { key: 'github', label: 'GitHub', icon: faGithub },
  { key: 'instagram', label: 'Instagram', icon: faInstagram },
  { key: 'linkedin', label: 'LinkedIn', icon: faLinkedinIn },
  { key: 'web', label: 'website', icon: faGlobe },
]

// One team member: framed photo, role, name, a short bio and social links
const InfoBox = ({ name, roles, image, description, social = {} }) => {
  const links = NETWORKS.filter(({ key }) => social[key])
  return (
    <article className="card team-card">
      <div className="team-card__head">
        <div className="team-card__photo">
          <img src={image} alt={name} loading="lazy" />
        </div>
        <div>
          <span className="eyebrow">{roles}</span>
          <h3 className="card-title team-card__name">{name}</h3>
        </div>
      </div>
      {description ? <p className="team-card__bio">{description}</p> : null}
      {links.length ? (
        <ul className="team-card__social">
          {links.map(({ key, label, icon }) => (
            <li key={key}>
              <a
                href={social[key]}
                target="_blank"
                rel="noreferrer noopener"
                className="team-card__link"
                aria-label={`${name} on ${label}`}
                title={label}
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default InfoBox
