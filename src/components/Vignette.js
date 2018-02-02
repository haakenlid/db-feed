import React from 'react'
import { Logo } from 'logos'

export default ({ host, ...props }) => (
  <div className="Vignette" {...props}>
    <Logo host={host} />
  </div>
)
