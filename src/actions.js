const FEED_REQUESTED = 'FEED_REQUESTED'
const FEED_RECEIVED = 'FEED_RECEIVED'
const FEED_REQUEST_FAILED = 'FEED_REQUEST_FAILED'

const feedRequested = params => ({ type: FEED_REQUESTED, params })
const feedReceived = data => ({ type: FEED_RECEIVED, data })
const feedRequestFailed = error => ({ type: FEED_REQUEST_FAILED, error })

export const actions = { FEED_REQUESTED, FEED_RECEIVED, FEED_REQUEST_FAILED }
export const actionCreators = { feedReceived, feedRequested, feedRequestFailed }
