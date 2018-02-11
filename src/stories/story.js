import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'components/Story'
import { object } from '@storybook/addon-knobs'
import placeholderImage from './26-kult-astroillustrasjon2_HL.jpg'
import loremHipsum from 'lorem-hipsum'

const sentences = n => loremHipsum({ count: n, units: 'sentences' })
const words = n => loremHipsum({ count: n, units: 'words' })

const baseProps = {
  host: 'db',
  title: 'Tumblr Williamsburg normcore asymmetrical street art',
  description:
    'Sriracha meggings artisan jean shorts cliche brunch Helvetica tote bag vinyl.',
  content:
    'Thundercats lomo art party tofu retro pork belly. Sustainable Schlitz asymmetrical craft beer kitsch tofu gluten-free pour-over banh mi tousled artisan cliche trust fund Cosby sweater Odd Future. Fingerstache mustache iPhone normcore banh mi pug lo-fi craft beer Vice mustache fixie pop-up.',
  url: 'https://example.com/story',
  posted: '1973-05-06',
  image: placeholderImage,
}

storiesOf('Story', module).add('with props', () => {
  const props = object('props', baseProps)
  return <Story {...props} />
})
