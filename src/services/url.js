import * as R from 'ramda'

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

// buildUrl ::  String -> Object -> String
export const buildUrl = R.curryN(2, (baseurl = '', params) =>
  R.ifElse(isEmpty, R.always(baseurl), params =>
    R.join('?', [baseurl, queryString(params)])
  )(params)
)
