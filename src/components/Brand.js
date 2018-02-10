import React from 'react'
import { Logo } from 'logos'

const Brand = ({ host, ...props }) => (
  <div className="Brand" {...props}>
    <Logo host={host} />
  </div>
)
export default Brand
