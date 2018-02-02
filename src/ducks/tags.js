import * as R from 'ramda'
const SLICE = 'tags'
const INITIAL_STATE = {
  nyheter: true,
  utenriks: true,
  økonomi: false,
  sport: false,
  kultur: true,
  underholdning: true,
  debatt: true,
}

// actions
export const TOGGLE_TAG = 'tags/TOGGLE_TAG'
export const toggleTag = tag => ({
  type: TOGGLE_TAG,
  payload: { tag },
})
export const ONLY_TAG = 'tags/ONLY_TAG'
export const onlyTag = tag => ({
  type: ONLY_TAG,
  payload: { tag },
})

// selectors
export const selectTags = R.prop(SLICE)
export const selectActiveTags = R.pipe(
  selectTags,
  R.filter(R.identity),
  R.keys,
  R.map(R.replace(/ø/g, 'o'))
)
export const selectInactiveTags = R.always([])
// export const selectInactiveTags = R.pipe(selectTags, R.filter(R.not), R.keys)

// reducer
const getReducer = ({ type, payload }) => {
  switch (type) {
    case TOGGLE_TAG:
      return R.over(R.lensProp(payload.tag), R.not)
    case ONLY_TAG:
      return R.mapObjIndexed((v, k, o) => R.equals(payload.tag, k))
    default:
      return R.identity
  }
}

export default (state = INITIAL_STATE, action) => getReducer(action)(state)
