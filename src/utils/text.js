import * as R from 'ramda'
import { distanceInWordsToNow } from 'date-fns'
import norwayLocale from 'date-fns/locale/nb'

// :: * -> string
export const stringify = R.cond([
  [R.is(String), R.identity],
  [R.isNil, R.always('')],
  [R.T, R.toString],
])

// :: Date -> string
export const formatDate = (value, locale = norwayLocale) =>
  distanceInWordsToNow(new Date(value), { addSuffix: true, locale })

// :: number, string -> string
export const textExtract = (maxLength, text) =>
  text
    .replace(/.*: ?\d\dZ/, '')
    .substr(0, maxLength)
    .replace(/([.?])[^.?]*$/, '$1')
