// redux-saga sagas

import { select, takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { actions, actionCreators } from './actions'

export function* feedSaga() {
  yield takeEvery(actions.FEED_REQUESTED, fetchFeed)
  yield put(actionCreators.feedRequested())
}

const selectFeedParameters = ({ feedParameters }) => feedParameters

function* fetchFeed() {
  const params = yield select(selectFeedParameters)
  const { response, error } = yield call(api.fetchFeed, params)
  if (response) {
    yield put(actionCreators.feedReceived(response))
  } else {
    yield put(actionCreators.feedRequestFailed(error))
  }
}
