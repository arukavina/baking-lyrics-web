import { getArtistsDataMock as getMockedData } from './mock'
import {
  get
} from '..'

export const getArtistsDataMock = () => getMockedData()

export const getArtistsData = filter => filter 
  ? get(`http://bakinglyrics.com:3000/artists?filter=${filter}`) 
  : get('http://bakinglyrics.com:3000/artists')
