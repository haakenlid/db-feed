// redux reducers
import { actions } from './actions'

export const feed = (state = [], action) => {
  switch (action.type) {
    case actions.FEED_RECEIVED:
      return action.data
    default:
      return state
  }
}

const initialParams = {
  excludePaywall: true,
  includeAnyTags: true,
  includeHosts: ['dagbladet.no', 'vg.no', 'nrk.no'],
  limit: 5,
  offset: 0,
}

export const feedParameters = (state = initialParams, action) => {
  return state
}

export const selectFeedParameters = state => state.feedParameters
export const selectFeed = state => state.feed
