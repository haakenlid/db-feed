import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { AppContainer } from 'react-hot-loader'
import Page from 'components/Page'

const rootStore = configureStore()
const rootElement = document.getElementById('root')

const render = App => {
  ReactDOM.render(
    <Provider store={rootStore}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    rootElement
  )
}

registerServiceWorker()
render(Page)

if (module.hot) {
  module.hot.accept('components/Page', () => render(Page))
}
