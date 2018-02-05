import React from 'react'
import { Logo } from 'logos'

export default ({ host, ...props }) => (
  <div className="Brand" {...props}>
    <Logo host={host} />
  </div>
)
