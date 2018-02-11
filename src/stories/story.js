import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'components/Story'
import { object } from '@storybook/addon-knobs'
import placeholderImage from './26-kult-astroillustrasjon2_HL.jpg'
import loremHipsum from 'lorem-hipsum'

const sentences = n => loremHipsum({ count: n, units: 'sentences' })
const words = n => loremHipsum({ count: n, units: 'words' })

const baseProps = {
  host: 'vg',
  title: words(5),
  description: sentences(1),
  content: sentences(5),
  url: 'https://example.com/story',
  posted: '1973-05-06',
  image: placeholderImage,
}

storiesOf('Story', module).add('with props', () => {
  const props = object('props', baseProps)
  return <Story {...props} />
})
