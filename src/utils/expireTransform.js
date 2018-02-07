import { createTransform } from 'redux-persist'
import { staleAfter } from 'utils/misc'

export default ({ timeout = 5, ...config }) => {
  const isExpired = staleAfter(timeout)
  const inFn = (state, key) => ({
    timestamp: Date.now(),
    ...state,
    fetching: false,
  })
  const outFn = (state, key) =>
    state.timestamp && isExpired(state.timestamp) ? {} : state

  return createTransform(inFn, outFn, config)
}
