import * as R from 'ramda'
import { buildUrl } from './url'
import { htmlDecode } from 'utils/text'

const BASE_URL = 'https://harvester.sol.no/get'

const toHttps = R.replace(/^http:/, 'https:')

// pluck and flatten data from backend
const selectApiData = ({
  host,
  title,
  posted,
  url,
  fields: { description, content, image },
}) => ({
  title,
  description: htmlDecode(description),
  content,
  posted,
  host,
  url,
  image: toHttps(image || ''),
})

// convert data from api into the shape used in the redux state.
export const normalizeData = R.pipe(
  R.prop('items'),
  R.map(selectApiData),
  R.indexBy(R.prop('url'))
)

// Use the Fetch API to get data from the backend.
// url parameters can be numbers, strings or an array of numbers/strings.
// fetchFeed :: {urlParamaters} -> Promise({error|response})
export const fetchFeed = params =>
  fetch(buildUrl(BASE_URL, params))
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => (response.ok ? json : Promise.reject(json)))
    .then(normalizeData)
    .then(
      items => ({
        response: {
          timestamp: new Date().toISOString(),
          items,
        },
      }),
      error => ({ error })
    )
