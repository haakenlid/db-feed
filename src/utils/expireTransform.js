import { createTransform } from 'redux-persist'

const now = Date.now
// const now = new Date().valueOf()

const expired = timeout => timestamp =>
  now() - new Date(timestamp).valueOf() > timeout * 1000 * 60

export default ({ timeout = 5, ...config }) => {
  const isExpired = expired(timeout)
  const inFn = (state, key) => ({ ...state, timestamp: now() })
  const outFn = (state, key) =>
    state.timestamp && isExpired(state.timestamp) ? {} : state

  return createTransform(inFn, outFn, config)
}
