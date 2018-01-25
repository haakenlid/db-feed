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

const hosts = [
  'dagbladet.no',
  'aftenposten.no',
  'vg.no',
  'nrk.no',
  'nettavisen.no',
  'tv2.no',
  'dn.no',
  'dagsavisen.no',
  'abcnyheter.no',
  'bt.no',
  'aftenbladet.no',
  'fvn.no',
  'adressa.no',
  'hegnar.no',
]
const tags = [
  'nyheter',
  'sport',
  'underholdning',
  'kjendis',
  'film',
  'musikk',
  'kultur',
  'utenlandske',
]
const initialParams = {
  excludePaywall: true,
  includeHosts: ['dagbladet.no', 'vg.no', 'nrk.no'],
  tags: ['netflix'],
  limit: 10,
  offset: 10,
  excludeTags: [
    'nyheter',
    'sport',
    //   'underholdning',
    //   'kjendis',
    //   'film',
    //   'musikk',
    //   'kultur',
    'utenlandske',
  ],
  // includeAnyTags: ['nyheter', 'okonomi'],
}

export const feedParameters = (state = initialParams, action) => {
  return state
}

export const selectFeedParameters = state => state.feedParameters
export const selectFeed = state => state.feed
