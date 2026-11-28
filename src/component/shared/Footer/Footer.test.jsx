import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import packageJson from '../../../../package.json'
import { mockFetch, requestedUrls } from '../../../test/utils'
import Footer from './Footer'
import BuildInfo from './BuildInfo'
import { FRONT_BUILD, formatCommitDate } from './build'

const VERSION_URL = '/api/v1/general/version'
const BACK_SHA = 'abc1234def5678abc1234def5678abc1234def56'
const FRONT_SHA = 'def5678abc1234def5678abc1234def5678abc12'
const DATE = '2026-11-22T12:00:00+00:00'

const renderAt = (ui, path = '/') => render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>)

describe('Footer', () => {
  it('shows the tagline, the front version and the social links', async () => {
    mockFetch({ [VERSION_URL]: [404, { message: 'Not Found' }] })
    const { container } = renderAt(<Footer />)
    expect(screen.getByText(/Lyrics by machines, since 2018\./)).toBeInTheDocument()
    expect(container.querySelector('.site-footer__build')).toHaveTextContent(`v${packageJson.version} · (front)`)
    expect(screen.getByRole('link', { name: 'GitHub' }))
      .toHaveAttribute('href', 'https://github.com/arukavina/baking-lyrics-web')
    expect(screen.getByRole('link', { name: 'LinkedIn' }))
      .toHaveAttribute('href', 'https://www.linkedin.com/in/andreirukavina/?locale=en')
    expect(await screen.findByRole('link', { name: 'Andrei Rukavina' })).toHaveAttribute('target', '_blank')
  })

  it('links the terms and conditions', () => {
    mockFetch()
    renderAt(<Footer />, '/artist')
    expect(screen.getByRole('link', { name: /you accept our terms and conditions/ }))
      .toHaveAttribute('href', '/terms-and-conditions')
  })

  it('hides the terms sentence on the terms page itself', () => {
    mockFetch()
    renderAt(<Footer />, '/terms-and-conditions')
    expect(screen.queryByText(/you accept our terms and conditions/)).not.toBeInTheDocument()
  })
})

describe('BuildInfo', () => {
  it('gets the front build info from vite define', () => {
    expect(FRONT_BUILD.version).toBe(packageJson.version)
    expect(typeof FRONT_BUILD.commit).toBe('string')
    expect(FRONT_BUILD.commit).not.toBe('')
  })

  it('links the front commit with its date', async () => {
    mockFetch()
    renderAt(<BuildInfo front={{ version: '9.9.9', commit: FRONT_SHA, date: DATE }} />)
    const link = screen.getByRole('link', { name: 'def5678' })
    expect(link).toHaveAttribute('href', `https://github.com/arukavina/baking-lyrics-web/commit/${FRONT_SHA}`)
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(link.parentElement).toHaveTextContent('(front) def5678 Nov 22, 2026')
    await screen.findByRole('link', { name: 'Andrei Rukavina' })
  })

  it('shows "(front) dev" without a commit', () => {
    mockFetch()
    const { container } = renderAt(<BuildInfo front={{ version: '9.9.9', commit: 'dev', date: '' }} />)
    expect(container).toHaveTextContent('v9.9.9 · (front) dev · Andrei Rukavina')
  })

  it('adds the back segment when the backend reports its commit', async () => {
    const fetchMock = mockFetch({ [VERSION_URL]: [200, { version: '0.5.0', commit: BACK_SHA, date: DATE }] })
    const { container } = renderAt(<BuildInfo front={{ version: '9.9.9', commit: FRONT_SHA, date: DATE }} />)
    const link = await screen.findByRole('link', { name: 'abc1234' })
    expect(link).toHaveAttribute('href', `https://github.com/arukavina/baking-lyrics/commit/${BACK_SHA}`)
    expect(link).toHaveAttribute('target', '_blank')
    expect(container).toHaveTextContent(
      'v9.9.9 · (back) abc1234 Nov 22, 2026 · (front) def5678 Nov 22, 2026 · Andrei Rukavina'
    )
    expect(requestedUrls(fetchMock)).toEqual([VERSION_URL])
  })

  it('leaves the back segment out when the version call fails', async () => {
    const fetchMock = mockFetch({ [VERSION_URL]: [500, { message: 'boom' }] })
    const { container } = renderAt(<BuildInfo front={{ version: '9.9.9', commit: FRONT_SHA, date: DATE }} />)
    await expect.poll(() => fetchMock.mock.calls.length).toBe(1)
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(container).not.toHaveTextContent('(back)')
    expect(container).toHaveTextContent('v9.9.9 · (front) def5678 Nov 22, 2026 · Andrei Rukavina')
  })

  it('formats commit dates and ignores invalid ones', () => {
    expect(formatCommitDate(DATE)).toBe('Nov 22, 2026')
    expect(formatCommitDate('')).toBeNull()
    expect(formatCommitDate('not a date')).toBeNull()
  })
})
