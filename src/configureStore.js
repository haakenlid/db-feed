import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { feed, feedParameters } from './reducers'
import { feedSaga } from './sagas'

export default initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = combineReducers({ feed, feedParameters })
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(feedSaga)
  return store
}
