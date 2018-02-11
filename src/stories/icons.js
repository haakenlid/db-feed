import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon, Logo, hosts } from 'logos'
import { boolean, select, number } from '@storybook/addon-knobs/react'

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
        <span>
          <Component title={name} key={name} host={name} />
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
  .add('single logo', single(Logo, logoList))
  .add('single icon', single(Icon, iconList))
  .add('all logos', list(Logo, logoList))
  .add('all icons', list(Icon, iconList))
