import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import feed from 'ducks/feed'
import tags from 'ducks/tags'
import hosts from 'ducks/hosts'
import { feedSaga } from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = combineReducers({ feed, tags, hosts })
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(feedSaga)
  return store
}
