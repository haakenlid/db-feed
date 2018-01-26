import * as R from 'ramda'
const SLICE = 'feed'
const INITIAL_STATE = {
  active: [],
  items: {},
  error: null,
  fetching: false,
}

// action constants
export const FEED_REQUESTED = 'FEED_REQUESTED'
export const FEED_RECEIVED = 'FEED_RECEIVED'
export const FEED_REQUEST_FAILED = 'FEED_REQUEST_FAILED'

// action creators
export const feedRequested = payload => ({ type: FEED_REQUESTED, payload })
export const feedReceived = payload => ({ type: FEED_RECEIVED, payload })
export const feedRequestFailed = error => ({ type: FEED_REQUEST_FAILED, error })

// selectors
export const selectFeed = R.prop(SLICE)
export const selectFeedItem = key =>
  R.pipe(selectFeed, R.prop('items'), R.prop(key))

// reducer
export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case FEED_RECEIVED:
      return {
        fetching: false,
        items: R.merge(state.items, payload),
        active: R.keys(payload),
      }
    case FEED_REQUESTED:
      return {
        fetching: true,
        ...state,
      }
    case FEED_REQUEST_FAILED:
      return {
        fetching: false,
        error,
        ...state,
      }
    default:
      return state
  }
}
