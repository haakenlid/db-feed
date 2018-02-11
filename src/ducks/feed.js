import * as R from 'ramda'

const SLICE = 'feed'
const INITIAL_STATE = {
  active: [],
  items: {},
  currentStory: null,
  storyIsOpen: false,
  error: null,
  fetching: false,
  offset: 0,
}

// action constants
export const FEED_REQUESTED = 'feed/REQUESTED'
export const FEED_RECEIVED = 'feed/RECEIVED'
export const FEED_REQUEST_FAILED = 'feed/REQUEST_FAILED'
export const VIEW_STORY = 'feed/VIEW_STORY'
export const NEXT_STORY = 'feed/NEXT_STORY'
export const VISIBILITY_CHANGED = 'feed/VISIBILITY_CHANGED'

// action creators
export const feedRequested = (append = false) => ({
  type: FEED_REQUESTED,
  payload: { append },
})
export const feedReceived = (response, append) => ({
  type: FEED_RECEIVED,
  payload: { append, ...response },
})
export const feedRequestFailed = error => ({ type: FEED_REQUEST_FAILED, error })
export const viewStory = id => ({
  type: VIEW_STORY,
  payload: { id },
})
export const nextStory = step => ({
  type: NEXT_STORY,
  payload: { step },
})
export const visibilityChanged = visibility => ({
  type: VISIBILITY_CHANGED,
  payload: visibility,
})

// selectors
export const selectFeed = R.prop(SLICE)
export const selectOpenStory = R.pipe(
  selectFeed,
  ({ items, currentStory, storyIsOpen }) => (storyIsOpen ? items[currentStory] : {})
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
      let items = payload.items
      let active = R.keys(items)
      let { currentStory, storyIsOpen } = state
      if (payload.append) {
        items = R.merge(state.items, items)
        active = R.concat(state.active, active)
      } else if (storyIsOpen) {
        let openItem = items[currentStory] || state.items[currentStory]
        if (openItem) items[currentStory] = openItem
        else storyIsOpen = false
      }
      return {
        ...state,
        timestamp: payload.timestamp,
        fetching: false,
        offset: active.length,
        active: R.uniq(active),
        items,
        storyIsOpen,
      }
    }
    case FEED_REQUESTED:
      return {
        ...state,
        fetching: true,
      }
    case VIEW_STORY:
      return {
        ...state,
        currentStory: payload.id || state.currentStory,
        storyIsOpen: Boolean(payload.id),
      }
    case NEXT_STORY: {
      const { step } = payload
      const { currentStory, active } = state
      let index = R.indexOf(currentStory, active) + step
      const newStory = active[index]
      return {
        ...state,
        currentStory: newStory || currentStory,
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
