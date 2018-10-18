import {
  get
} from '..'

export const getSong = (seed, numberWords, artistId) => {
  const url = new URL("http://bakinglyrics.com:3000/generate"),
    params = {seed: seed, number_words: numberWords, artist_id: artistId}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}

export const getGeneratedSong = (songId) => {
  const url = new URL("http://bakinglyrics.com:3000/generated-song"),
    params = { artificial_song_id: songId }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}