// Build info constants and helpers for the footer
export const GITHUB_URL = 'https://github.com/arukavina'
export const BACK_REPO_URL = 'https://github.com/arukavina/baking-lyrics'
export const FRONT_REPO_URL = 'https://github.com/arukavina/baking-lyrics-web'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/andreirukavina/?locale=en'
export const TERMS_PATH = '/terms-and-conditions'

// Injected by vite.config.js `define`
export const FRONT_BUILD = {
  version: __APP_VERSION__,
  commit: __COMMIT_SHA__,
  date: __COMMIT_DATE__,
}

export function formatCommitDate(date) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
