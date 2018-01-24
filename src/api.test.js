import { buildUrl } from './api'

test('build url', () => {
  expect(buildUrl({})).toBe('https://harvester.sol.no/get')
  expect(buildUrl({ foo: 'bar' })).toBe('https://harvester.sol.no/get?foo=bar')
})
