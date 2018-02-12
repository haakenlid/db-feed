import React from 'react'
import { object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import GoToTop from 'components/GoToTop'
import { Filters } from 'components/Filters'
import { Header } from 'components/Page'
import { simpleConfigureStore } from 'configureStore'
import { Provider } from 'react-redux'

storiesOf('Header', module)
  .addWithJSX('Connected Header', () => (
    <Provider store={simpleConfigureStore({})}>
      <Header />
    </Provider>
  ))
  .addWithJSX('Filters', () => {
    const props = {
      hosts: object('hosts', {
        nrk: true,
        vg: false,
        dagbladet: true,
      }),
      tags: object('tags', {
        nyheter: true,
        sport: true,
        debatt: false,
      }),
      toggleHost: action('toggle host'),
      toggleTag: action('toggle tag'),
      onlyHost: action('only host'),
      onlyTag: action('only tag'),
    }
    return (
      <header className="pageHeader" style={{ justifyContent: 'center' }}>
        <Filters {...props} />
      </header>
    )
  })
  .add('GoToTop', () => (
    <GoToTop style={{ display: 'flex' }} onClick={action('go to top')} />
  ))
