import React, { useEffect, useState } from 'react'
import { getVersion } from '../../../helpers/api'
import { BACK_REPO_URL, FRONT_BUILD, FRONT_REPO_URL, LINKEDIN_URL, formatCommitDate } from './build'
import ExternalLink from './ExternalLink'

// One "(label) sha date" segment: the label links to its repository, the sha to its commit on GitHub.
// Without a real sha it reads "(label) dev".
const CommitSegment = ({ label, repoUrl, commit, date }) => {
  const hasSha = Boolean(commit) && commit !== 'dev'
  const formattedDate = hasSha ? formatCommitDate(date) : null
  return (
    <>
      {' · ('}
      <ExternalLink href={repoUrl}>{label}</ExternalLink>
      {') '}
      {hasSha ? (
        <ExternalLink href={`${repoUrl}/commit/${commit}`}>{commit.slice(0, 7)}</ExternalLink>
      ) : (
        'dev'
      )}
      {formattedDate ? ` ${formattedDate}` : null}
    </>
  )
}

// v{version} · (back) sha date · (front) sha date · author. The back segment
// is left out when the backend cannot say which commit it runs.
function BuildInfo({ front = FRONT_BUILD }) {
  const [back, setBack] = useState(null)

  useEffect(() => {
    let active = true
    getVersion().then(result => {
      if (active) setBack(result)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <p className="site-footer__build meta">
      {`v${front.version}`}
      {back?.commit ? (
        <CommitSegment label="back" repoUrl={BACK_REPO_URL} commit={back.commit} date={back.date} />
      ) : null}
      <CommitSegment label="front" repoUrl={FRONT_REPO_URL} commit={front.commit} date={front.date} />
      {' · '}
      <ExternalLink href={LINKEDIN_URL}>Andrei Rukavina</ExternalLink>
    </p>
  )
}

export default BuildInfo
