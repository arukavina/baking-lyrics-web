import { describe, expect, it, vi } from 'vitest'
import configureStore from '../../store'
import { beyonce, artificialSong, jsonResponse, mockFetch, requestedUrls } from '../../test/utils'
import artistsReducer from './artists/reducer'
import artistsInitialState from './artists/initialState'
import {
  GET_ARTISTS_FULFILLED,
  GET_ARTISTS_PENDING,
  GET_ARTISTS_REJECTED,
  SAVE_COVER_IMAGE,
  SET_ARTISTS_TOTAL,
} from './artists/const'
import { ARTISTS_ERROR_MSG, getArtists, getArtistsTotal } from './artists/actions'
import songReducer from './song/reducer'
import songInitialState from './song/initialState'
import { CLEAR_SONG, GET_SONG_FULFILLED, GET_SONG_REJECTED } from './song/const'
import { generateSong, getGeneratedSong } from './song/actions'
import {
  ARTIST_UNUSABLE_MSG,
  GENERATOR_ERROR_MSG,
  GENERATOR_OFFLINE_MSG,
  RATE_LIMITED_MSG,
  NETWORK_ERROR_MSG,
  SONG_NOT_FOUND_MSG,
  generateErrorMessage,
  getSongErrorMessage,
} from './song/errors'
import wizardReducer, { changeField, resetWizard } from './wizard/slice'

const other = { ...beyonce, id: 2, name: 'adele', clean_name: 'Adele' }

describe('artists reducer', () => {
  it('stores the list and clears errors while fetching', () => {
    let state = artistsReducer(
      { ...artistsInitialState, errorMsg: 'old', list: [other] },
      { type: GET_ARTISTS_PENDING },
    )
    expect(state).toMatchObject({ isFetching: true, errorMsg: '', list: [] })
    state = artistsReducer(state, { type: GET_ARTISTS_FULFILLED, payload: { list: [beyonce] } })
    expect(state).toMatchObject({ isFetching: false, list: [beyonce] })
  })

  it('merges a cover image into the matching artist', () => {
    const state = artistsReducer(
      { ...artistsInitialState, list: [beyonce, other] },
      { type: SAVE_COVER_IMAGE, payload: { id: 2, coverImg: 'img.jpg' } },
    )
    expect(state.list[1]).toEqual({ ...other, coverImg: 'img.jpg' })
    expect(state.list[0]).toBe(beyonce)
  })

  it('ignores a cover image for an artist that is no longer listed', () => {
    const before = { ...artistsInitialState, list: [beyonce] }
    const after = artistsReducer(before, { type: SAVE_COVER_IMAGE, payload: { id: 99, coverImg: 'x' } })
    expect(after).toBe(before)
    expect(after.list).toHaveLength(1)
  })

  it('stores the total and the error status', () => {
    let state = artistsReducer(artistsInitialState, { type: SET_ARTISTS_TOTAL, payload: { total: 5 } })
    expect(state.total).toBe(5)
    state = artistsReducer(state, { type: GET_ARTISTS_REJECTED, payload: { errorMsg: 'nope', status: 500 } })
    expect(state).toMatchObject({ isFetching: false, errorMsg: 'nope', status: 500, total: 5 })
  })
})

describe('artists thunks', () => {
  it('loads random artists without a filter and searches with 3+ characters', async () => {
    const fetchMock = mockFetch({
      '/api/v1/artists/random/16': [200, [other]],
      '/api/v1/artists/search/bey': [200, [beyonce]],
    })
    const store = configureStore()
    await store.dispatch(getArtists('  '))
    expect(store.getState().artists.list).toEqual([other])
    await store.dispatch(getArtists('bey '))
    expect(store.getState().artists.list).toEqual([beyonce])
    const backendCalls = requestedUrls(fetchMock).filter(url => url.startsWith('/api'))
    expect(backendCalls).toEqual(['/api/v1/artists/random/16', '/api/v1/artists/search/bey'])
  })

  it('treats "no cover artists" as an empty list, not an error', async () => {
    mockFetch({ '/api/v1/artists/random/16': [404, { message: 'No famous artists found' }] })
    const store = configureStore()
    await store.dispatch(getArtists())
    expect(store.getState().artists).toMatchObject({ list: [], errorMsg: '', isFetching: false })
  })

  it('treats a non-array artist list as empty', async () => {
    mockFetch({ '/api/v1/artists/random/16': [200, { unexpected: true }] })
    const store = configureStore()
    await store.dispatch(getArtists())
    expect(store.getState().artists).toMatchObject({ list: [], errorMsg: '', isFetching: false })
  })

  it('reports an unreachable backend (empty-body 500 from the proxy) with status 0', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(500, undefined)))
    const store = configureStore()
    await store.dispatch(getArtists())
    expect(store.getState().artists).toMatchObject({ errorMsg: ARTISTS_ERROR_MSG, status: 0 })
  })

  it('reports a failed load with its status', async () => {
    mockFetch({ '/api/v1/artists/random/16': [500, { message: 'boom' }] })
    const store = configureStore()
    await store.dispatch(getArtists())
    expect(store.getState().artists).toMatchObject({ errorMsg: ARTISTS_ERROR_MSG, status: 500 })
  })

  it('loads the total and ignores failures', async () => {
    mockFetch({ '/api/v1/artists/?page=1&per_page=2': [200, { total: 3 }] })
    const store = configureStore()
    await store.dispatch(getArtistsTotal())
    expect(store.getState().artists.total).toBe(3)

    mockFetch()
    await store.dispatch(getArtistsTotal())
    expect(store.getState().artists.total).toBe(3)
  })
})

describe('song reducer and errors', () => {
  it('maps the backend song into camel case', () => {
    const state = songReducer(songInitialState, { type: GET_SONG_FULFILLED, payload: artificialSong })
    expect(state.generatedSong).toMatchObject({
      id: 7,
      lyrics: 'some generated lyrics',
      artificialTitle: artificialSong.artificial_title,
      baseArtist: beyonce,
      coverImg: null,
    })
  })

  it('stores the error status and clears it with the song', () => {
    let state = songReducer(songInitialState, {
      type: GET_SONG_REJECTED, payload: { errorMsg: GENERATOR_OFFLINE_MSG, status: 503 },
    })
    expect(state).toMatchObject({ errorMsg: GENERATOR_OFFLINE_MSG, status: 503, isFetching: false })
    state = songReducer(state, { type: CLEAR_SONG })
    expect(state).toMatchObject({ errorMsg: '', status: null })
  })

  it('has a friendly message per status', () => {
    expect(generateErrorMessage(503)).toBe(GENERATOR_OFFLINE_MSG)
    expect(generateErrorMessage(500)).toBe(GENERATOR_ERROR_MSG)
    expect(generateErrorMessage(400)).toBe(ARTIST_UNUSABLE_MSG)
    expect(generateErrorMessage(404)).toBe(ARTIST_UNUSABLE_MSG)
    expect(generateErrorMessage(0)).toBe(NETWORK_ERROR_MSG)
    expect(generateErrorMessage(429)).toBe(RATE_LIMITED_MSG)
    expect(getSongErrorMessage(404)).toBe(SONG_NOT_FOUND_MSG)
  })
})

describe('song thunks', () => {
  it('stores the offline message when the generator answers 503', async () => {
    mockFetch({
      '/api/v1/artificial_songs/generate/en/seed/hello/words/100/artist/1/': [503, { message: 'ML models are not loaded' }],
    })
    const store = configureStore()
    await store.dispatch(generateSong({ artistId: 1, seed: 'hello' }))
    expect(store.getState().song).toMatchObject({ errorMsg: GENERATOR_OFFLINE_MSG, status: 503 })
  })

  it('loads a generated song and reports a missing one', async () => {
    mockFetch({ '/api/v1/artificial_songs/7': [200, artificialSong] })
    const store = configureStore()
    await store.dispatch(getGeneratedSong('7'))
    expect(store.getState().song.generatedSong).toMatchObject({ id: 7, coverImg: null })

    await store.dispatch(getGeneratedSong('999'))
    expect(store.getState().song).toMatchObject({ errorMsg: SONG_NOT_FOUND_MSG, status: 404 })
  })
})

describe('wizard slice', () => {
  it('changes a field and resets', () => {
    let state = wizardReducer(undefined, changeField({ field: 'search', value: 'Beyonce Knowles' }))
    expect(state.search).toBe('Beyonce Knowles')
    state = wizardReducer(state, resetWizard())
    expect(state.search).toBe('')
  })
})
