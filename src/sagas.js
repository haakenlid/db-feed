import * as R from 'ramda'
import { select, takeLatest, call, put, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { REHYDRATE } from 'redux-persist'

import { preFetchImages, scrollToTop, staleAfter } from 'utils/misc'
import * as api from 'utils/api'
import * as feed from 'ducks/feed'
import * as hosts from 'ducks/hosts'
import * as tags from 'ducks/tags'

const FEED_PAGINATION = 12 // number of items fetched from api in one request
const EXPIRATION_MINUTES = 10 // cached feed items expiration timeout
const DEBOUNCE_MILLISECONDS = 500 // filter change debounce time

// Calculate query paramaters for api http request
// :: State -> {k:v}
export const selectFeedParameters = R.applySpec({
  includeHosts: hosts.selectActiveHosts,
  includeAnyTags: tags.selectActiveTags,
  offset: feed.selectOffset,
  limit: R.always(FEED_PAGINATION),
  excludePaywall: R.T,
  excludeDupes: R.always(95),
})

export default function* rootSaga() {
  yield all([
    takeLatest([feed.FEED_REQUESTED], fetchFeedSaga),
    takeLatest([feed.NEXT_STORY], nextStorySaga),
    takeLatest([tags.TOGGLE_TAG, hosts.TOGGLE_HOST], filtersChangedSaga),
    takeLatest([feed.VISIBILITY_CHANGED, REHYDRATE], loadFeedSaga),
    takeLatest([feed.FEED_RECEIVED], feedReceivedSaga),
  ])
}

export function* fetchFeedSaga(action) {
  // Fetch new items from api
  const { payload: { append } } = action
  let params = yield select(selectFeedParameters)
  if (!append) params = R.assoc('offset', 0, params)
  const { response, error } = yield call(api.fetchFeed, params)
  if (response) {
    yield put(feed.feedReceived(response, append))
  } else {
    yield put(feed.feedRequestFailed(error))
  }
}

function* loadFeedSaga() {
  // Check if feed is stale and request new data from api if needed
  const { timestamp } = yield select(feed.selectFeed)
  const isStale = staleAfter(EXPIRATION_MINUTES)
  if (!timestamp || isStale(timestamp)) yield put(feed.feedRequested())
}

function* filtersChangedSaga() {
  // Refetch feed from api when filter values have been changed
  yield call(delay, DEBOUNCE_MILLISECONDS) // debounce
  yield put(feed.feedRequested())
}

function* nextStorySaga() {
  // Request more items if the user has swiped far enough
  const { active, currentStory } = yield select(feed.selectFeed)
  if (active.length - R.indexOf(currentStory, active) < FEED_PAGINATION / 2)
    yield put(feed.feedRequested(true))
}

function* feedReceivedSaga(action) {
  // Scroll to top of page and prefetch images if needed
  const { items, append } = action.payload
  if (!append) yield call(scrollToTop)
  yield call(preFetchImages, items)
}
