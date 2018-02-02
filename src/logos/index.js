import React from 'react'
import icons from './icons'
import logos from './full'
import './index.css'

const getComponent = (lib, hostname) => lib[hostname.replace('.no', '')]

export const Icon = ({ host, ...props }) => {
  const Component = getComponent(icons, host)
  return Component ? (
    <Component className="Icon" {...props} />
  ) : (
    <span className="Icon fallback">{host}</span>
  )
}

export const Logo = ({ host, ...props }) => {
  const Component = getComponent(logos, host)
  return Component ? (
    <Component className="Logo" {...props} />
  ) : (
    <span className="Logo fallback">{host}</span>
  )
}
