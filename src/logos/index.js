import React from 'react'
import icons from './icons'
import logos from './full'
import './logos.css'

const getComponent = (lib, hostname) => lib[hostname.replace('.no', '')]

export const Icon = ({ host = 'example.com', ...props }) => {
  const Component = getComponent(icons, host)
  return Component ? (
    <Component className="Icon" {...props} />
  ) : (
    <span className="Icon fallback">{host}</span>
  )
}

export const Logo = ({ host = 'example.com', ...props }) => {
  const Component = getComponent(logos, host)
  return Component ? (
    <Component className="Logo" {...props} />
  ) : (
    <span className="Logo fallback">{host}</span>
  )
}

export const hosts = {
  logos: Object.keys(logos),
  icons: Object.keys(icons),
}
