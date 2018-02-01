import * as R from 'ramda'
const SLICE = 'hosts'
const INITIAL_STATE = {
  abcnyheter: true,
  adresseavisen: false,
  aftenposten: true,
  bt: true,
  dagbladet: true,
  dagsavisen: false,
  dn: false,
  fvn: false,
  nrk: true,
  aftenbladet: false,
  tv2: true,
  vg: true,
}

// actions
export const TOGGLE_HOST = 'hosts/TOGGLE_HOST'
export const toggleHost = host => ({
  type: TOGGLE_HOST,
  payload: { host },
})

export const ONLY_HOST = 'hosts/ONLY_HOST'
export const onlyHost = host => ({
  type: ONLY_HOST,
  payload: { host },
})

// selectors
export const selectHosts = R.prop(SLICE)
export const selectActiveHosts = R.pipe(
  selectHosts,
  R.filter(R.identity),
  R.keys,
  R.map(R.flip(R.concat)('.no'))
)

// reducer
const getReducer = ({ type, payload }) => {
  switch (type) {
    case TOGGLE_HOST:
      return R.over(R.lensProp(payload.host), R.not)
    case ONLY_HOST:
      return R.mapObjIndexed((v, k, o) => R.equals(payload.host, k))
    default:
      return R.identity
  }
}

export default (state = INITIAL_STATE, action) => getReducer(action)(state)
