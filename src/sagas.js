import * as R from 'ramda'
import { select, takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as feed from 'ducks/feed'
import * as hosts from 'ducks/hosts'
import * as tags from 'ducks/tags'
import * as api from 'utils/api'
import { preFetchImage, scrollToTop } from 'utils/misc'

const REHYDRATE = 'persist/REHYDRATE'
const FEED_PAGINATION = 12

export function* feedSaga() {
  yield takeLatest(feed.FEED_REQUESTED, fetchFeed)
  yield takeEvery(feed.NEXT_STORY, nextStorySaga)
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
  limit: FEED_PAGINATION,
})

function* nextStorySaga() {
  const { active, openStory } = yield select(feed.selectFeed)
  if (active.length - R.indexOf(openStory, active) < FEED_PAGINATION / 2)
    yield put(feed.feedRequested())
}

function* persistListener() {
  yield put(feed.feedRequested())
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
    yield call(R.map(preFetchImage), response)
  } else {
    yield put(feed.feedRequestFailed(error))
  }
}
