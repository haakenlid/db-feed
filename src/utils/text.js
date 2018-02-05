import * as R from 'ramda'
import { distanceInWordsToNow } from 'date-fns'
import norwayLocale from 'date-fns/locale/nb'

// Convert arbitrary values to string
// :: * -> string
export const stringify = R.cond([
  [R.is(String), R.identity],
  [R.isNil, R.always('')],
  [R.T, R.toString],
])

// :: Date -> string
export const formatDate = (value, locale = norwayLocale) =>
  distanceInWordsToNow(new Date(value), { addSuffix: true, locale })

// Truncate text, but try to keep sentences complete
// :: number, string -> string
export const textExtract = (maxLength, text) =>
  text
    .replace(/.*: ?\d\dZ/, '') // strip metadata and timestamp in some stories
    .substr(0, maxLength)
    .replace(/([.?])[^.?]*$/, '$1')

// Convert HTML entities in input data to characters
// :: ?String -> String
export const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input || '', 'text/html')
  return doc.documentElement.textContent.trim()
}
