import * as R from 'ramda'
import { buildUrl } from './url'

const BASE_URL = 'https://harvester.sol.no/get'

const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent.trim()
}

const selectApiData = ({
  externalId,
  host,
  title,
  posted,
  url,
  fields: { description, content, image },
}) => ({
  externalId,
  title,
  description: htmlDecode(description),
  content,
  posted,
  host,
  url,
  image,
})

export const normalizeData = R.pipe(
  R.prop('items'),
  R.map(selectApiData),
  R.map(item => [R.replace(/https?:/, '', item.url), item]),
  R.fromPairs
)

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
