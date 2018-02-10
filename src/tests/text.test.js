import * as R from 'ramda'
import { stringify, textExtract, cleanString } from 'utils/text'
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
