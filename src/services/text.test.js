import { stringify } from './text'

test('stringify', () => {
  expect(stringify({ foo: 'bar' })).toEqual('{"foo": "bar"}')
  expect(stringify('foobar')).toEqual('foobar')
  expect(stringify(2)).toEqual('2')
  expect(stringify(undefined)).toEqual('')
  expect(stringify(null)).toEqual('')
})
