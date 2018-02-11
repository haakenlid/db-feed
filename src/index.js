import 'react-hot-loader/patch'
import 'stylesheets/index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { PersistGate } from 'redux-persist/lib/integration/react'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import Page from 'components/Page'

const { store, persistor } = configureStore()
const rootElement = document.getElementById('root')

const renderApp = App => {
  const render = rootElement.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render
  return render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <App />
        </AppContainer>
      </PersistGate>
    </Provider>,
    rootElement
  )
}

renderApp(Page)
module.hot && module.hot.accept('components/Page', () => renderApp(Page))

registerServiceWorker()
