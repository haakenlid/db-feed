import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import feed from 'ducks/feed'
import tags from 'ducks/tags'
import hosts from 'ducks/hosts'
import rootSaga from './sagas'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import expireTransform from 'utils/expireTransform'

const expireFeedState = minutes =>
  expireTransform({ timeout: minutes, whitelist: ['feed'] })

const persistConfig = {
  key: 'redux state',
  storage: storage, // use localstorage to persist state
  transforms: [expireFeedState(10)], // expire stale feed data
  stateReconciler: autoMergeLevel2, // use initialState of slice if expired
}

const getReducer = () => combineReducers({ feed, tags, hosts })

// default export for full app
export default initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const reducer = persistReducer(persistConfig, getReducer())
  const composeEnhancers = // use redux devtools if available
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}

// simple store without middleware for storybook
export const simpleConfigureStore = initialState =>
  createStore(getReducer(), initialState)
