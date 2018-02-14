import * as R from 'ramda'
import {
  formatDate,
  dedupeContent,
  stringify,
  textExtract,
  cleanString,
} from 'utils/text'
import apiData from './apidata.sample.json'

test('stringify values', () => {
  expect(stringify({ foo: 'bar' })).toEqual('{"foo": "bar"}')
  expect(stringify('foobar')).toEqual('foobar')
  expect(stringify(2)).toEqual('2')
  expect(stringify(undefined)).toEqual('')
  expect(stringify(null)).toEqual('')
})

test('cleanString', () => {
  expect(cleanString('&nbsp;')).toEqual('')
  expect(cleanString('&aring;')).toEqual('å')
  expect(cleanString('  \n  ')).toEqual('')
  expect(cleanString('- sitat')).toEqual('–\u2060\u202fsitat')
})

test('textExtract', () => {
  expect(textExtract(2, 'aaa')).toEqual('aa')
  R.map(({ fields: { content, description } }) => {
    expect(textExtract(500, content).length).toBeLessThan(501)
    expect(textExtract(100, description).length).toBeLessThan(101)
  }, apiData.items)
})

test('formatDate', () => {
  const week = 7 * 24 * 60 * 60 * 1000
  const now = Date.now()
  expect(formatDate(now + week)).toEqual('om 7 dager')
  expect(formatDate(now - week)).toEqual('for 7 dager siden')
})

test('dedupeContent', () => {
  expect(dedupeContent({ content: 'abc def', description: 'abc' })).toEqual({
    description: 'abc',
    content: 'def',
  })
  expect(
    dedupeContent({
      description: '12.000 glad-gutter',
      content: '12. 000 glad - gutter bla bla',
    }).content
  ).toEqual('bla bla')
})
