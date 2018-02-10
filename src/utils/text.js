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
export const textExtract = (maxLength, text = '') =>
  text
    .replace(/^.{0,300}T\d\d: ?\d\d: ?\d\dZ/, '') // strip metadata and timestamp in some stories
    .substr(0, maxLength)
    .replace(/([.?])[^.?]*$/, '$1')

// Convert any HTML entities in input data to unicode characters
// :: String -> String
const htmlDecode = input => {
  if (!/&\S+;/.test(input)) return input // performance shortcut
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

const NOBREAK = '\u2060\u202f' // unicode word joiner + unicode narrow no-break space

// Use proper quotation dash instead of hyphen
// :: String -> String
const fiksSitatstrek = R.replace(/([:.] |^)[-–] /g, `$1–${NOBREAK}`)

export const cleanString = R.pipe(
  R.defaultTo(''),
  htmlDecode,
  R.trim,
  fiksSitatstrek // Dagblad-sporten ...
)
