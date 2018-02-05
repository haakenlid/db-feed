import * as R from 'ramda'
const SLICE = 'feed'
const INITIAL_STATE = {
  active: [],
  items: {},
  openStory: null,
  storyIsOpen: false,
  error: null,
  fetching: false,
  offset: 0,
}

// action constants
export const FEED_REQUESTED = 'feed/REQUESTED'
export const FEED_RECEIVED = 'feed/RECEIVED'
export const FEED_REQUEST_FAILED = 'feed/REQUEST_FAILED'
export const FEED_RESET_OFFSET = 'feed/RESET_OFFSET'
export const VIEW_STORY = 'feed/VIEW_STORY'
export const NEXT_STORY = 'feed/NEXT_STORY'

// action creators
export const feedRequested = () => ({ type: FEED_REQUESTED })
export const feedReceived = payload => ({ type: FEED_RECEIVED, payload })
export const feedRequestFailed = error => ({ type: FEED_REQUEST_FAILED, error })
export const feedResetOffset = () => ({ type: FEED_RESET_OFFSET })
export const viewStory = id => ({
  type: VIEW_STORY,
  payload: { id },
})
export const nextStory = step => ({
  type: NEXT_STORY,
  payload: { step },
})

// selectors
export const selectFeed = R.prop(SLICE)
export const selectOpenStory = R.pipe(
  selectFeed,
  ({ items, openStory, storyIsOpen }) => (storyIsOpen ? items[openStory] : {})
)
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
        active = R.uniq(R.concat(state.active, keys))
      }
      return {
        ...state,
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
    case VIEW_STORY:
      return {
        ...state,
        openStory: payload.id || state.openStory,
        storyIsOpen: Boolean(payload.id),
      }
    case NEXT_STORY: {
      const { step } = payload
      const { openStory, active } = state
      let index = R.indexOf(openStory, active) + step
      const newStory = active[index]
      return {
        ...state,
        openStory: newStory || openStory,
        storyIsOpen: Boolean(newStory),
      }
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
