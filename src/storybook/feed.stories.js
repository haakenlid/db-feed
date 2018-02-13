import React from 'react'
import { boolean, text } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'

import { baseProps, randomProps } from './utils'
import Provider from './Provider'

import { FeedStory } from 'components/FeedStory'
import LoadingIndicator from 'components/LoadingIndicator'
import Feed from 'components/Feed'

storiesOf('Feed', module)
  .addWithJSX(
    'FeedStory',
    withNotes(
      'Single feed story. The props can be edited in the Knobs panel.'
    )(() => {
      const props = {
        host: text('host', baseProps.host),
        title: text('title', baseProps.title),
        image: text('image', baseProps.image),
      }
      return <FeedStory {...props} />
    })
  )
  .addWithJSX(
    'LoadingIndicator',
    withNotes(
      'loading indicator can be stopped and started in the Knobs panel.'
    )(() => (
      <LoadingIndicator
        isLoading={boolean('isLoading', false)}
        children={text('message', '') || null}
      />
    ))
  )
  .add(
    'Feed',
    withNotes('Newsfeed with sample data.')(() => (
      <Provider>
        <Feed />
      </Provider>
    ))
  )
