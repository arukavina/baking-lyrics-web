import React from 'react'

// Opens in a new tab without leaking the opener
const ExternalLink = ({ href, className = 'site-footer__link', children, ...props }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...props}>
    {children}
  </a>
)

export default ExternalLink
