import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon, Logo, hosts } from 'logos'
import { boolean, select, number } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

const list = (Component, choices) => () => {
  const dark = boolean('invert', false)
  const style = {
    fontSize: number('font size', 4) + 'rem',
    background: dark ? '#333' : null,
    color: dark ? '#fff' : null,
  }
  return (
    <section className="logoList" style={style}>
      {choices.map(name => (
        <span key={name} title={name}>
          <Component host={name} />
        </span>
      ))}
    </section>
  )
}

const single = (Component, choices) => () => {
  const dark = boolean('invert', false)
  const style = {
    fontSize: number('font size', 12) + 'rem',
    background: dark ? '#333' : null,
    color: dark ? '#fff' : null,
  }
  const host = select('hostname', choices, choices[0])
  return (
    <div className="single" style={style}>
      <Component host={host} />
    </div>
  )
}

const logoList = [...hosts.logos, 'fallback']
const iconList = [...hosts.icons, 'fallback']

storiesOf('Logos', module)
  .addWithJSX(
    'all logos',
    withNotes('Single coloured svg icons')(list(Logo, logoList)),
    { skip: 1 }
  )
  .addWithJSX(
    'single logo',
    withNotes('Choose icon in the Knobs panel.')(single(Logo, logoList)),
    { skip: 1 }
  )
  .addWithJSX(
    'all icons',
    withNotes('Full svg logos. Some are multi coloured.')(list(Icon, iconList)),
    { skip: 1 }
  )
  .addWithJSX(
    'single icon',
    withNotes('Choose logo in the Knobs panel.')(single(Icon, iconList)),
    { skip: 1 }
  )
