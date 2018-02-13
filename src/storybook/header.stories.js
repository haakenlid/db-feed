import React from 'react'
import { object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import GoToTop from 'components/GoToTop'
import { Filters } from 'components/Filters'
import { Header } from 'components/Page'
import Provider from './Provider'
import { withNotes } from '@storybook/addon-notes'

storiesOf('Header', module)
  .addWithJSX(
    'Connected Header',
    withNotes('The complete Header, connected with redux store')(() => (
      <Provider>
        <Header />
      </Provider>
    ))
  )
  .addWithJSX(
    'Filters',
    withNotes(
      'No event listeners. Change knobs to modify. Both tags and hosts can be changed'
    )(() => {
      const props = {
        hosts: object('hosts', {
          nrk: true,
          vg: false,
          dagbladet: true,
          aftenposten: true,
        }),
        tags: object('tags', {
          nyheter: true,
          sport: true,
          debatt: false,
        }),
      }
      return (
        <header className="Header" style={{ justifyContent: 'center' }}>
          <Filters {...props} />
        </header>
      )
    })
  )
  .add(
    'GoToTop',
    withNotes('Go to top button. Only shows on small screens')(() => (
      <GoToTop
        style={{ display: 'flex' }}
        onClick={action('scroll to top of page')}
      />
    ))
  )
