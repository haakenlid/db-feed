import { buildUrl } from './url'

test('build url', () => {
  const url = 'http://example.com/get'
  expect(buildUrl(url, {})).toBe(url)
  expect(buildUrl(url)({ foo: 'bar' })).toBe(url + '?foo=bar')
})
