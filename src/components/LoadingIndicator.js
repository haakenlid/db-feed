import React from 'react'
import { connect } from 'react-redux'
import { selectFeed } from 'ducks/feed'
import './loader.css'

const LoadingIndicator = ({ fetching }) => (
  <div className="LoadingIndicator">
    {fetching && <div className="loader" />}
  </div>
)
export default connect(selectFeed)(LoadingIndicator)
