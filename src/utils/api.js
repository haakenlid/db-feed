import * as R from 'ramda'
import { buildUrl } from './url'
import { cleanString } from 'utils/text'

export const BASE_URL = 'https://harvester.sol.no/get'

const normalizeItem = R.pipe(
  ({ host, posted, title, url, fields: { description, content, image } }) => ({
    title,
    description,
    content,
    posted,
    host,
    url,
    image,
  }),
  R.map(cleanString),
  R.over(R.lensProp('image'), R.replace(/^http:/, 'https:'))
)

// pluck and flatten data from backend to suit the redux state
export const normalizeData = R.pipe(
  R.prop('items'),
  R.map(normalizeItem),
  R.indexBy(R.prop('url')) // turn array into object using `url` as key
)

// Use the Fetch API to get data from the backend.
// url parameters can be numbers, strings or an array of numbers/strings.
// fetchFeed :: {urlParamaters} -> Promise({error|response})
export const fetchFeed = params =>
  fetch(buildUrl(BASE_URL, params))
    .then(response => response.json().then(json => ({ json, response })))
    .catch(error => Promise.reject({ message: error.toString() })) // json serializable error
    .then(({ json, response }) => (response.ok ? json : Promise.reject(json)))
    .then(normalizeData)
    .then(R.objOf('items'))
    .then(R.assoc('timestamp', new Date().toJSON()))
    .then(response => ({ response }), error => ({ error }))
