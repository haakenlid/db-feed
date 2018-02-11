import React from 'react'
import icons from './icons'
import logos from './full'
import classNames from 'classnames'
import './logos.css'

const Fallback = ({ host, className, ...props }) => (
  <span className={classNames('fallback', className)} {...props}>
    {host}
  </span>
)

const logoFactory = (lib, baseClass) => ({
  host = 'example.com',
  className = '',
  ...props
}) => {
  const Component = lib[host] || lib[host.replace('.no', '')] || Fallback
  return (
    <Component
      className={classNames(baseClass, className)}
      {...props}
      host={host}
    />
  )
}

// Loog and Icon must be declared as functions to get display name
export const Logo = props => logoFactory(logos, 'Logo')(props)
export const Icon = props => logoFactory(icons, 'Icon')(props)

export const hosts = {
  logos: Object.keys(logos),
  icons: Object.keys(icons),
}
