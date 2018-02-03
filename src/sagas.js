import { select, takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as feed from 'ducks/feed'
import * as hosts from 'ducks/hosts'
import * as tags from 'ducks/tags'
import * as api from 'services/api'

const REHYDRATE = 'persist/REHYDRATE'

export function* feedSaga() {
  yield takeLatest(feed.FEED_REQUESTED, fetchFeed)
  yield takeLatest([tags.TOGGLE_TAG, hosts.TOGGLE_HOST], filterListener)
  yield takeLatest(REHYDRATE, persistListener)
}

const selectFeedParameters = state => ({
  excludePaywall: true,
  excludeDupes: 95,
  includeHosts: hosts.selectActiveHosts(state),
  includeAnyTags: tags.selectActiveTags(state),
  excludeTags: tags.selectInactiveTags(state),
  offset: feed.selectOffset(state),
  limit: 12,
})

function* persistListener() {
  yield put(feed.feedRequested())
}

function scrollToTop() {
  window.scrollTo(0, 0)
}

function* filterListener() {
  // refetch feed when filter inputs are changed
  const DEBOUNCE = 500
  yield call(delay, DEBOUNCE)
  yield put(feed.feedResetOffset())
  yield put(feed.feedRequested())
  yield call(scrollToTop)
}

function* fetchFeed() {
  const params = yield select(selectFeedParameters)
  const { response, error } = yield call(api.fetchFeed, params)
  if (response) {
    yield put(feed.feedReceived(response))
  } else {
    yield put(feed.feedRequestFailed(error))
  }
}

// function* scrollSpySaga() {
//   yield call(delay, 100)
// }
