import React, { useEffect, useRef, useState } from 'react'

// Local replacement for the TinyButton of the unmaintained react-scroll-up-button package.
// Same look and behaviour: fades in after scrolling 150px and eases back to the top.

const SHOW_AT_POSITION = 150
const ANIMATION_DURATION = 500

const mainStyle = {
  backgroundColor: 'rgb(87, 86, 86)',
  height: 30,
  position: 'fixed',
  bottom: 20,
  width: 30,
  WebkitTransition: 'all 0.5s ease-in-out',
  transition: 'all 0.5s ease-in-out',
  transitionProperty: 'opacity, right',
  cursor: 'pointer',
  opacity: 0,
  right: -75,
  zIndex: 1000,
  fill: '#292929',
  paddingBottom: 1,
  paddingLeft: 1,
  paddingRight: 1,
}

const toggledStyle = {
  opacity: 1,
  right: 30,
}

const easeOutCubic = (t, from, to, duration) => {
  const progress = t / duration - 1
  return (to - from) * (progress * progress * progress + 1) + from
}

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false)
  const frame = useRef(null)

  const stopScrolling = () => window.cancelAnimationFrame(frame.current)

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > SHOW_AT_POSITION)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('wheel', stopScrolling, { passive: true })
    window.addEventListener('touchstart', stopScrolling, { passive: true })
    return () => {
      stopScrolling()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', stopScrolling)
      window.removeEventListener('touchstart', stopScrolling)
    }
  }, [])

  const handleClick = () => {
    stopScrolling()
    const startPosition = window.pageYOffset
    let startTime = null
    const step = () => {
      const now = Date.now()
      if (!startTime) startTime = now
      if (window.pageYOffset <= 0) return stopScrolling()
      const position = Math.max(easeOutCubic(now - startTime, startPosition, 0, ANIMATION_DURATION), 0)
      window.scrollTo(0, position)
      frame.current = window.requestAnimationFrame(step)
    }
    frame.current = window.requestAnimationFrame(step)
  }

  return (
    <aside
      role="button"
      aria-label="Scroll to top of page"
      tabIndex={visible ? 0 : -1}
      className={`ScrollUpButton__Container ${visible ? 'ScrollUpButton__Toggled' : ''}`}
      style={visible ? { ...mainStyle, ...toggledStyle } : mainStyle}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" xmlSpace="preserve">
        <path d="M26.297 20.797l-2.594 2.578c-0.391 0.391-1.016 0.391-1.406 0l-8.297-8.297-8.297 8.297c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.578c-0.391-0.391-0.391-1.031 0-1.422l11.594-11.578c0.391-0.391 1.016-0.391 1.406 0l11.594 11.578c0.391 0.391 0.391 1.031 0 1.422z" />
      </svg>
    </aside>
  )
}

export default ScrollUpButton
