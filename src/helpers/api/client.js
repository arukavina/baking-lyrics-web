// Thin fetch wrapper for the Baking-Lyrics backend (Flask, routes under /api/v1).
// The backend has no CORS support, so the default base URL is same-origin:
// in development Vite proxies /api to the backend (see vite.config.js).
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api/v1').replace(/\/+$/, '')

// Thrown for every non-2xx response (status = HTTP status), for a 2xx
// response that is not JSON, and for network or gateway failures (status = 0).
// `body` is the parsed JSON error body when there is one.
export class ApiError extends Error {
  constructor(status, message, body = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

const NETWORK_ERROR_MSG = 'Network error: backend unreachable'
// Statuses that, without a JSON body, come from a proxy or gateway rather
// than the backend. 503 is left out: the backend uses it for "generator offline".
const GATEWAY_STATUSES = new Set([500, 502, 504])

async function apiRequest(path, { method = 'GET', query, data, signal } = {}) {
  const qs = query ? `?${new URLSearchParams(query)}` : ''
  const init = { headers: { Accept: 'application/json' }, signal }
  if (method !== 'GET') init.method = method
  if (data !== undefined) {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }
  let res
  try {
    res = await fetch(`${API_URL}${path}${qs}`, init)
  } catch (e) {
    if (e?.name === 'AbortError') throw e
    throw new ApiError(0, NETWORK_ERROR_MSG, null)
  }
  // The backend always answers JSON, so an unparsable body (null here) means
  // something else answered: a static host SPA fallback or a proxy error page.
  const body = await res.json().catch(() => null)
  if (res.ok) {
    if (body === null) {
      throw new ApiError(res.status, 'Unexpected response from the server', null)
    }
    return body
  }
  if (body === null && GATEWAY_STATUSES.has(res.status)) {
    // Proxy or gateway failure (the Vite proxy answers 500 with an empty body
    // when the backend is down): the backend is unreachable.
    throw new ApiError(0, NETWORK_ERROR_MSG, null)
  }
  // statusText is '' over HTTP/2
  throw new ApiError(res.status, body?.message || res.statusText || `HTTP ${res.status}`, body)
}

export const apiGet = (path, { query, signal } = {}) => apiRequest(path, { query, signal })

/** POSTs `data` as JSON; resolves and rejects like apiGet */
export const apiPost = (path, data, { signal } = {}) => apiRequest(path, { method: 'POST', data, signal })

export const isNotFound =e => e instanceof ApiError && e.status === 404
export const isGeneratorOffline = e => e instanceof ApiError && e.status === 503
