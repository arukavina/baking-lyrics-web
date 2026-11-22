import React, { useEffect, useRef, useState } from 'react'
import './ScrollUpButton.css'

// Back to top pill: fades in after scrolling 150px and eases back to the top
// (jumps straight there when the user prefers reduced motion).

const SHOW_AT_POSITION = 150
const ANIMATION_DURATION = 500

const easeOutCubic = (t, from, to, duration) => {
  const progress = t / duration - 1
  return (to - from) * (progress * progress * progress + 1) + from
}

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false)
  const frame = useRef(null)

  const stopScrolling = () => window.cancelAnimationFrame(frame.current)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AT_POSITION)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0)
      return
    }
    const startPosition = window.scrollY
    let startTime = null
    const step = () => {
      const now = Date.now()
      if (!startTime) startTime = now
      if (window.scrollY <= 0) return stopScrolling()
      const position = Math.max(easeOutCubic(now - startTime, startPosition, 0, ANIMATION_DURATION), 0)
      window.scrollTo(0, position)
      frame.current = window.requestAnimationFrame(step)
    }
    frame.current = window.requestAnimationFrame(step)
  }

  return (
    <button
      type="button"
      className={visible ? 'scroll-up is-visible' : 'scroll-up'}
      aria-label="Back to top"
      title="Back to top"
      onClick={handleClick}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default ScrollUpButton
