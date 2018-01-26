import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Page from 'components/Page'

const rootStore = configureStore()

export default () => (
  <Provider store={rootStore}>
    <Page />
  </Provider>
)
