import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { AppContainer } from 'react-hot-loader'
import Page from 'components/Page'
import { PersistGate } from 'redux-persist/lib/integration/react'
import 'stylesheets/index.css'

const { store, persistor } = configureStore()
const rootElement = document.getElementById('root')

const render = App => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
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
