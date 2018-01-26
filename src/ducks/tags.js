import * as R from 'ramda'
const SLICE = 'tags'
const INITIAL_STATE = {
  nyheter: true,
  okonomi: true,
  sport: false,
  underholdning: true,
  film: true,
  musikk: true,
  kjendis: true,
  utenlandske: true,
}

// actions
export const TOGGLE_TAG = 'tags/TOGGLE_TAG'
export const toggleTag = tag => ({
  type: TOGGLE_TAG,
  payload: { tag },
})

// selectors
export const selectTags = R.prop(SLICE)
export const selectActiveTags = R.pipe(selectTags, R.filter(R.identity), R.keys)

// reducer
const getReducer = ({ type, payload }) => {
  switch (type) {
    case TOGGLE_TAG:
      return R.over(R.lensProp(payload.tag), R.not)
    default:
      return R.identity
  }
}

export default (state = INITIAL_STATE, action) => getReducer(action)(state)
