import * as R from 'ramda'

const baseUrl = 'https://harvester.sol.no/get'
const baseParams = {
  excludePaywall: true,
  includeAnyTags: true,
  includeHosts: ['dagbladet.no', 'vg.no', 'nrk.no'],
  limit: 15,
  offset: 0,
}

const cleanData = ({
  externalId,
  host,
  title,
  posted,
  url,
  fields: { image, content, description },
}) => ({
  id: externalId,
  title,
  description,
  content,
  posted,
  host,
  url,
  image,
})

export const fetchFeed = (params = baseParams) =>
  fetch(buildUrl(params))
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) return Promise.reject(json)
      return json
    })
    .then(json => json.items.map(cleanData))
    .then(
      response => {
        return { response }
      },
      error => ({ error: error.message || `Fetch failed` })
    )

// paramPairs :: (String | Array, String, Object) -> { String : String }
export const paramPairs = (key, value) =>
  R.is(Array, value)
    ? `${key}=${value.map(cleanValues).join(',')}`
    : `${key}=${cleanValues(value)}`

// convert query data to url paramater string
// cleanValues :: Number|String -> String
export const cleanValues = R.pipe(
  String,
  R.trim,
  R.replace(/\s+/g, ' '),
  encodeURIComponent
)

// Emptiness test where the falsy values 0 and false are not empty
// but trythy values {} and [] are empty.
// isEmpty :: Any -> Boolean
const isEmpty = R.contains(R.__, [{}, undefined, null, [], ''])

// flipify mapObjectIndexed
// ((k, v) -> A) -> Object[k, v] -> Array[A]
const mapObject = fn =>
  R.pipe(R.mapObjIndexed((val, key, _) => fn(key, val)), R.values)

// Build url safe querystring from object mapping.
// queryString :: Obj -> String
const queryString = R.pipe(
  R.reject(isEmpty),
  mapObject(paramPairs),
  R.join('&')
)

// buildUrl ::  Object -> String
export const buildUrl = R.ifElse(isEmpty, R.always(baseUrl), params =>
  R.join('?', [baseUrl, queryString(params)])
)
