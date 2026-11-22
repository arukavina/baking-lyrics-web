import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureStore from '../store'
import { AppRoutes } from '../routes'

export const beyonce = {
  id: 1,
  name: 'beyonce-knowles',
  clean_name: 'Beyonce Knowles',
  cover: false,
  country: 'US',
  formation_date: '1986-06-28T00:00:00',
  genre: 'Pop',
}

export const artificialSong = {
  id: 7,
  artificial_title: { id: 7, title: 'ego-remix(Artificial)', creation_date: '2026-11-22T10:00:00' },
  lyrics: 'some generated lyrics',
  model: 'MODEL',
  creation_date: '2026-11-22T10:00:00',
  user: { id: null, name: null, email: null, auth_method: null, member_since: null },
  base_artist: beyonce,
}

export const jsonResponse = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText: `HTTP ${status}`,
  json: () => (body === undefined ? Promise.reject(new SyntaxError('no body')) : Promise.resolve(body)),
})

// Stubs the global fetch. `routes` maps a URL (string, exact match) or a
// predicate to a [status, body] pair. Wikipedia lookups answer with no image
// and anything unknown answers 404.
export function mockFetch(routes = {}) {
  const fetchMock = vi.fn(async (url) => {
    const href = String(url)
    if (href.startsWith('https://en.wikipedia.org/')) {
      return jsonResponse(200, { query: { pages: { '-1': { missing: '' } } } })
    }
    const match = Object.entries(routes).find(([key]) => key === href)
    if (match) {
      const [status, body] = match[1]
      return jsonResponse(status, body)
    }
    return jsonResponse(404, { message: 'Not Found' })
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

export const requestedUrls = fetchMock => fetchMock.mock.calls.map(([url]) => String(url))

export function renderApp(path = '/', { store = configureStore() } = {}) {
  const utils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  )
  return { store, ...utils }
}
