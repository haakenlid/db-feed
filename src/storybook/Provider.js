import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { action as actionLogger } from '@storybook/addon-actions'

import feed from 'ducks/feed'
import tags from 'ducks/tags'
import hosts from 'ducks/hosts'
import initialState from './store.fixture.json'

const logger = store => next => action => {
  const { type, ...payload } = action
  actionLogger(type)(payload)
  return next(action)
}

const configureStore = () =>
  createStore(
    combineReducers({ feed, hosts, tags }),
    initialState,
    applyMiddleware(logger)
  )

export default ({ children }) => (
  <Provider store={configureStore()}>{children}</Provider>
)
