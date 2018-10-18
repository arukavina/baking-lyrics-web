import {
  get
} from '..'

export const getSong = (seed, numberWords, artistId) => {
  var url = new URL("http://bakinglyrics:3000/generate"),
    params = {seed: seed, number_words: numberWords, artist_id: artistId}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}

export const getGeneratedSong = (songId) => {
  var url = new URL("http://bakinglyrics:3000/generated-song"),
    params = { artificial_song_id: songId }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return get(url)
}