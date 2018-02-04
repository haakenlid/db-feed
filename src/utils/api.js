import * as R from 'ramda'
import { buildUrl } from './url'

const BASE_URL = 'https://harvester.sol.no/get'

// Fix HTML entities in input data
// :: ?String -> String
const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input || '', 'text/html')
  return doc.documentElement.textContent.trim()
}

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
  image,
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
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then(normalizeData)
    .then(
      response => ({ response }),
      error => {
        console.log(error)
        return { error: error.message || `Fetch failed` }
      }
    )
