const MOCKDATE = new Date('2018-02-09')
const _Date = Date

describe('global test mocks', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn(() => ({ matches: true }))
    global.Date = jest.fn(val => (val ? new _Date(val) : MOCKDATE)) // for valid snapshot
    global.Date.now = jest.fn(() => MOCKDATE.valueOf())
  })
})
