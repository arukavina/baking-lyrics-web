// Thin fetch wrapper for the Baking-Lyrics backend (Flask, routes under /api/v1).
// The backend has no CORS support, so the default base URL is same-origin:
// in development Vite proxies /api to the backend (see vite.config.js).
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api/v1').replace(/\/+$/, '')

// Thrown for every non-2xx response (status = HTTP status) and for network
// failures (status = 0). `body` is the parsed JSON error body when there is one.
export class ApiError extends Error {
  constructor(status, message, body = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiGet(path, { query, signal } = {}) {
  const qs = query ? `?${new URLSearchParams(query)}` : ''
  let res
  try {
    res = await fetch(`${API_URL}${path}${qs}`, {
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (e) {
    if (e?.name === 'AbortError') throw e
    throw new ApiError(0, 'Network error: backend unreachable', null)
  }
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(res.status, body?.message ?? res.statusText, body)
  }
  return body
}

export const isNotFound = e => e instanceof ApiError && e.status === 404
export const isGeneratorOffline = e => e instanceof ApiError && e.status === 503
