import { normalizeData, fetchFeed, BASE_URL } from 'utils/api'
import * as R from 'ramda'
import apiData from './apidata.sample.json'

// set up mocks for date and fetch/api
global.fetch = jest.fn(
  url =>
    new Promise(
      (resolve, reject) =>
        /fail$/.test(url)
          ? resolve({
              ok: false,
              json: () => Promise.resolve({ message: 'server error' }),
            })
          : resolve({
              ok: true,
              json: () => Promise.resolve(apiData),
            })
    )
)

describe('normalizeData', () => {
  const cleanedData = normalizeData(apiData)
  test('matches snapshot', () => {
    expect(cleanedData).toMatchSnapshot()
  })
  test('matches data shape', () => {
    const isRFC3339 = expect.stringMatching(
      /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/
    )
    const itemShape = expect.objectContaining({
      title: expect.any(String),
      description: expect.any(String),
      content: expect.any(String),
      posted: isRFC3339, // standard Date.toJSON() format
      host: expect.stringMatching(/^[.\w]+\.\w{2,3}$/),
      image: expect.stringMatching(/^($|https:)/), // https: or empty string
      url: expect.stringMatching(/^https?:/), // https: or http:
    })
    R.map(item => expect(item).toEqual(itemShape), cleanedData)
  })
})

describe('fetchFeed', () => {
  test('api returns a Promise', () => {
    expect(fetchFeed()).toBeInstanceOf(Promise)
  })
  test('correct parameters resolves to json data', async () => {
    expect.assertions(2) // for async tests
    await expect(
      fetchFeed({ foo: 'bar', tags: [3, 2, 1] })
    ).resolves.toMatchSnapshot()
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}?foo=bar&tags=3,2,1`)
  })
  test('incorrect http request results in error', async () => {
    expect.assertions(2) // for async tests
    await expect(fetchFeed({ result: 'fail' })).resolves.toMatchObject({
      error: { message: 'server error' },
    })
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}?result=fail`)
  })
})
