import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Feed from './Feed'

const rootStore = configureStore({ feed: ['hello world', 'foo', 'bar'] })

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">News feed</h1>
    </header>
    <Feed />
  </div>
)

export default () => (
  <Provider store={rootStore}>
    <App />
  </Provider>
)
