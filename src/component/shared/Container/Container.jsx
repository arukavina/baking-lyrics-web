import React from 'react'

// The one place page width is defined: full width with page gutters on
// mobile, two thirds of the viewport centered from 1024px (see .container).
const Container = ({ as: Tag = 'div', className = '', children, ...props }) => (
  <Tag className={className ? `container ${className}` : 'container'} {...props}>
    {children}
  </Tag>
)

export default Container
