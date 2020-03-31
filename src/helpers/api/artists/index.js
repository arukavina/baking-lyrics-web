import { getArtistsDataMock as getMockedData } from './mock'
import {
  get
} from '..'

export const getArtistsDataMock = () => getMockedData()
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getArtistsData = filter => filter 
  ? get(`${API_URL}/artists?filter=${filter}`) 
  : get(`${API_URL}/artists`)
