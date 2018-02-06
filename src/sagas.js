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

export default function* rootSaga() {
  yield takeLatest(feed.FEED_REQUESTED, fetchFeedSaga)
  yield takeEvery(feed.NEXT_STORY, nextStorySaga)
  yield takeLatest([tags.TOGGLE_TAG, hosts.TOGGLE_HOST], filtersChangedSaga)
  yield takeLatest(REHYDRATE, initalizeSaga)
}

// runs after state has been hydrated
function* initalizeSaga() {
  const { active } = yield select(feed.selectFeed)
  if (!active.length) yield put(feed.feedRequested())
}

function* filtersChangedSaga() {
  // refetch feed when filter inputs are changed
  const DEBOUNCE = 500
  yield call(delay, DEBOUNCE)
  yield put(feed.feedRequested())
}

function* nextStorySaga() {
  const { active, openStory } = yield select(feed.selectFeed)
  if (active.length - R.indexOf(openStory, active) < FEED_PAGINATION / 2)
    yield put(feed.feedRequested(true))
}

const selectFeedParameters = state => ({
  excludePaywall: true,
  excludeDupes: 95,
  includeHosts: hosts.selectActiveHosts(state),
  includeAnyTags: tags.selectActiveTags(state),
  offset: feed.selectOffset(state),
  limit: FEED_PAGINATION,
})

function* fetchFeedSaga(action) {
  const { payload: { append } } = action
  const params = yield select(selectFeedParameters)
  if (!append) params.offset = 0
  const { response, error } = yield call(api.fetchFeed, params)
  if (response) {
    if (!append) yield call(scrollToTop)
    yield put(feed.feedReceived(response, append))
    yield call(R.map(preFetchImage), response)
  } else {
    yield put(feed.feedRequestFailed(error))
  }
}
