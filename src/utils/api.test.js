import { normalizeData } from 'utils/api'
import * as R from 'ramda'
import apidata from './apidata.json'

test('normalizeData', () => {
  expect(apidata.items.length).toEqual(10)
  const cleanedData = normalizeData(apidata)
  expect(R.keys(cleanedData).length).toEqual(10)
  const entry = R.values(cleanedData)[0]
  expect(R.keys(entry)).toEqual([
    'externalId',
    'title',
    'description',
    'content',
    'posted',
    'host',
    'url',
    'image',
  ])
})
