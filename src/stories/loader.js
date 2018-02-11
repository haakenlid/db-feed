import React from 'react'
import { boolean, text } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import LoadingIndicator from 'components/LoadingIndicator'

storiesOf('LoadingIndicator', module).addWithJSX('feed loader', () => (
  <LoadingIndicator
    isLoading={boolean('isLoading', false)}
    children={text('message', '') || null}
  />
))
