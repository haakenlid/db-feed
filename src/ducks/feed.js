import * as R from 'ramda'
const SLICE = 'feed'
const INITIAL_STATE = {
  active: [],
  items: {},
  error: null,
  fetching: false,
  offset: 0,
}

// action constants
export const FEED_REQUESTED = 'FEED_REQUESTED'
export const FEED_RECEIVED = 'FEED_RECEIVED'
export const FEED_REQUEST_FAILED = 'FEED_REQUEST_FAILED'
export const FEED_RESET_OFFSET = 'FEED_RESET_OFFSET'

// action creators
export const feedRequested = payload => ({ type: FEED_REQUESTED, payload })
export const feedReceived = payload => ({ type: FEED_RECEIVED, payload })
export const feedRequestFailed = error => ({ type: FEED_REQUEST_FAILED, error })
export const feedResetOffset = () => ({ type: FEED_RESET_OFFSET })

// selectors
export const selectFeed = R.prop(SLICE)
export const selectFeedItem = key =>
  R.pipe(selectFeed, R.prop('items'), R.prop(key))
export const selectOffset = state => {
  return R.prop('offset', selectFeed(state))
}

// reducer
export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case FEED_RECEIVED: {
      const items = R.merge(state.items, payload)
      const keys = R.keys(payload)
      let active = keys
      if (state.offset > 0) {
        active = R.concat(state.active, keys)
      }
      return {
        fetching: false,
        items,
        active,
        offset: active.length,
      }
    }
    case FEED_RESET_OFFSET:
      return {
        ...state,
        offset: 0,
      }
    case FEED_REQUESTED:
      return {
        ...state,
        fetching: true,
      }
    case FEED_REQUEST_FAILED:
      return {
        ...state,
        error,
        fetching: false,
      }
    default:
      return state
  }
}
