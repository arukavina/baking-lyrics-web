// User facing messages for the song requests, keyed on the HTTP status
// (0 means the backend could not be reached).
export const GENERATOR_OFFLINE_MSG = 'The lyrics generator is offline right now. Please try again later.'
export const GENERATOR_ERROR_MSG = 'The lyrics generator hit an error. Please try again later.'
export const ARTIST_UNUSABLE_MSG = "We can't generate lyrics for this artist. Please pick another one."
export const SEED_INVALID_MSG = 'Please write an opening line of up to 300 characters.'
export const RATE_LIMITED_MSG = "You're baking fast! Please wait a minute and try again."
export const SONG_NOT_FOUND_MSG = "We couldn't find that song."
export const NETWORK_ERROR_MSG = "We couldn't reach the server. Please check your connection and try again."
export const UNKNOWN_ERROR_MSG = 'Something went wrong. Please try again later.'

export function generateErrorMessage(status) {
  switch (status) {
    case 503: return GENERATOR_OFFLINE_MSG
    case 429: return RATE_LIMITED_MSG
    case 411: return SEED_INVALID_MSG
    case 500: return GENERATOR_ERROR_MSG
    case 400:
    case 404: return ARTIST_UNUSABLE_MSG
    case 0: return NETWORK_ERROR_MSG
    default: return UNKNOWN_ERROR_MSG
  }
}

export function getSongErrorMessage(status) {
  switch (status) {
    case 404: return SONG_NOT_FOUND_MSG
    case 0: return NETWORK_ERROR_MSG
    default: return UNKNOWN_ERROR_MSG
  }
}
