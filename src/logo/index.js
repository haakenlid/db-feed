import React from 'react'
import icons from './icons'
import logos from './full'

export const Icon = ({ host, ...props }) =>
  icons[host]({ className: 'Icon', ...props })

export const Icons = () => (
  <div>{Object.keys(icons).map(host => <Icon key={host} host={host} />)}</div>
)

export const Logo = ({ host, ...props }) => logos[host](props)

export const Logos = () => (
  <div>{Object.keys(logos).map(host => <Logo key={host} host={host} />)}</div>
)
