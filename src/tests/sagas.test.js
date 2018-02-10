import * as api from 'utils/api'
import { preFetchImages, scrollToTop, staleAfter } from 'utils/misc'
import { select, put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import * as feed from 'ducks/feed'
import { selectFeedParameters, fetchFeedSaga } from 'sagas'

const getState = () => ({
  hosts: { ap: true, db: false, bt: true },
  tags: { nyheter: false, sport: true },
  feed: { offset: 3 },
})
const getParams = () => ({
  includeHosts: ['ap.no', 'bt.no'],
  includeAnyTags: ['sport'],
  offset: 3,
  limit: 12,
  excludePaywall: true,
  excludeDupes: 95,
})

test('selectFeedParameters', () => {
  expect(selectFeedParameters(getState())).toEqual(getParams())
})

const cases = [['fetch replace', false], ['fetch append', true]]
cases.forEach((name, append) =>
  describe(name, () => {
    const action = feed.feedRequested(append) // append = false
    const generator = cloneableGenerator(fetchFeedSaga)(action)
    test('send fetch request to api', () => {
      expect(generator.next().value).toEqual(select(selectFeedParameters))
      const params = append ? getParams() : { ...getParams(), offset: 0 }
      expect(generator.next(getParams()).value).toEqual(
        call(api.fetchFeed, params)
      )
    })
    test('api response success', () => {
      const apiResponse = { response: 'ok' }
      const receivedAction = feed.feedReceived(apiResponse.response, append)
      const next = generator.clone().next
      expect(next(apiResponse).value).toEqual(put(receivedAction))
      expect(next().done).toBe(true)
    })
    test('api response error', () => {
      const apiResponse = { error: 'fail' }
      const errorAction = feed.feedRequestFailed(apiResponse.error)
      const next = generator.clone().next
      expect(next(apiResponse).value).toEqual(put(errorAction))
      expect(next().done).toBe(true)
    })
  })
)
