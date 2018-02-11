import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'components/Story'
import { text, date } from '@storybook/addon-knobs'
import placeholderImage from './26-kult-astroillustrasjon2_HL.jpg'
import loremHipsum from 'lorem-hipsum'

const sentences = n => loremHipsum({ count: n, units: 'sentences' })
const words = n => loremHipsum({ count: n, units: 'words' })

const txt =
  'Thundercats lomo art party tofu retro pork belly. Sustainable Schlitz asymmetrical craft beer kitsch tofu gluten-free pour-over banh mi tousled artisan cliche trust fund Cosby sweater Odd Future. Fingerstache mustache iPhone normcore banh mi pug lo-fi craft beer Vice mustache fixie pop-up.'

const lede =
  'Sriracha meggings artisan jean shorts cliche brunch Helvetica tote bag vinyl.'

storiesOf('Story', module).addWithJSX('with props', () => {
  const props = {
    host: text('host', 'dagbladet.no'),
    title: text(
      'title',
      'Tumblr Williamsburg normcore asymmetrical street art'
    ),
    description: text('description', lede),
    content: text('content', txt),
    url: text('url', 'https://example.com/story'),
    posted: date('posted', new Date('2018-02-02')),
    image: text('image', placeholderImage),
  }
  return props.url ? <Story {...props} /> : <p>will not render without url</p>
})
