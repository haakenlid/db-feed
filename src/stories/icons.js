import React from 'react'
import 'stylesheets/index.css'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Icon, Logo, hosts } from 'logos'
const Wrapper = ({ hosts, Component }) => (
  <section
    style={{
      fontSize: '5em',
      display: 'flex',
      flexFlow: 'column wrap',
      height: '10em',
    }}
  >
    {hosts.map(name => (
      <Component
        title={name}
        style={{ padding: '0.1em' }}
        key={name}
        host={name}
      />
    ))}
  </section>
)
storiesOf('Logos', module)
  .add('icons', () => <Wrapper hosts={hosts.icons} Component={Icon} />)
  .add('logos', () => <Wrapper hosts={hosts.logos} Component={Logo} />)
