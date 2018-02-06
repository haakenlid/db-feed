import { createTransform } from 'redux-persist'

const getTimestamp = val => (val ? new Date(val) : new Date()).valueOf()

const expired = timeout => timestamp => {
  const timedelta = getTimestamp() - getTimestamp(timestamp)
  return timedelta > timeout * 1000 * 60
}

export default ({ timeout = 5, ...config }) => {
  const isExpired = expired(timeout)
  const inFn = (state, key) => ({ ...state, timestamp: getTimestamp() })
  const outFn = (state, key) => {
    return state.timestamp && isExpired(state.timestamp) ? {} : state
  }
  return createTransform(inFn, outFn, config)
}
