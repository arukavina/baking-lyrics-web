import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { clearWikipediaCache } from '../helpers/api/wikipedia'

afterEach(() => {
  cleanup()
  localStorage.clear()
  clearWikipediaCache()
})
