import * as R from 'ramda'
// import norwayLocale from 'date-fns/locale/nb'
import { formatDistance } from 'date-fns'
import { nb } from 'date-fns/locale'

// Convert values of arbitrary types to sensible string for end user
// :: * -> string
export const stringify = R.cond([
  [R.is(String), R.identity], // string -> itself
  [R.isNil, R.always('')], // null | undefined -> ''
  [R.T, R.toString], // for all other types, use ramda.toString
])

// Human readable and localized relative timestamp
// :: Date -> String
export const formatDate = (value, locale = nb) => {
  const [then, now] = [new Date(value), new Date()]
  const result = formatDistance(then, now, { locale })
  return then < now ? `for ${result} siden` : `om ${result}`
}

// Truncate text, but try to keep sentences complete
// :: number, string -> string
export const textExtract = (maxLength, text = '') =>
  text
    .replace(/^.{0,300}T\d\d: ?\d\d: ?\d\dZ/, '') // strip metadata and timestamp in some stories
    .substr(0, maxLength)
    .replace(/([.?!])[^.?!]*$/, '$1') // prune trailing sentence fragment

// Convert any HTML entities in input data to unicode characters
// :: String -> String
const _htmlDecode = input => {
  // DOMparser is slow. Skip if there's no html entities.
  if (!/&\S+;/.test(input)) return input
  return new DOMParser().parseFromString(input, 'text/html').documentElement
    .textContent
}

// Use proper Norwegian typographic quotation dash instead of hyphen
const WORD_JOINER = '\u2060' // browser workaround to avoid line break between dash and non breaking space
const NARROW_NO_BREAK_SPACE = '\u202f' // slightly narrower looks better IMHO
// :: String -> String
const _correctQuotationDash = R.replace(
  /([:.] |^)[-–] /g, // hypen after : or . or at string start should actually be an en-dash
  `$1–${WORD_JOINER}${NARROW_NO_BREAK_SPACE}`
)

// Clean up the text content from the api.
// :: ?String -> String
export const cleanString = R.pipe(
  R.defaultTo(''),
  _htmlDecode,
  R.trim,
  _correctQuotationDash
)

// Some items from the api contains the description (almost) repeated at the
// start of the content. This function removes the dupes.
// :: Object -> Object
export const dedupeContent = ({ description, content, ...rest }) => ({
  content: content.replace(_descriptionRegExp(description), '').trim(),
  description,
  ...rest,
})

// The content text data from the api has a bunch of extra space characters
// inserted around dashes and full stops. Create a regular expression that
// takes that into account and matches even if there's extra spaces.
// :: String -> RegExp
const _descriptionRegExp = text =>
  new RegExp('^' + text.replace(/\./g, '\\. ?').replace(/ ?- ?/, ' ?- ?'))
