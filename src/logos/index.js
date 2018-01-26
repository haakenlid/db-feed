import React from 'react'
import icons from './icons'
import logos from './full'

export const Icon = ({ host, ...props }) =>
  icons[host] ? (
    icons[host]({ className: 'Icon', ...props })
  ) : (
    <span>Icon for {host}</span>
  )

export const Logo = ({ host, ...props }) =>
  logos[host] ? (
    logos[host]({ className: 'Logo', ...props })
  ) : (
    <span>Logo for {host}</span>
  )
