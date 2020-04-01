import {
  get
} from '..'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getSong = (seed, numberWords, artistId) => {
  const url = new URL(`${API_URL}/generate`),
    params = {seed: seed, number_words: numberWords, artist_id: artistId}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}

export const getGeneratedSong = (songId) => {
  const url = new URL(`${API_URL}/generated-song`),
    params = { artificial_song_id: songId }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}