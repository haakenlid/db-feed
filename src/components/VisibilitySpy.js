import React from 'react'
import { connect } from 'react-redux'

const VISIBILITY_CHANGED = 'document/VISIBILITY_CHANGED'

const visibilityChanged = visibility => ({
  type: VISIBILITY_CHANGED,
  payload: visibility,
})

class VisibilitySpy extends React.Component {
  constructor(props) {
    super(props)
    const { visibilityChanged } = this.props
    this.eventHandler = e =>
      document.visibilityState === 'visible' &&
      visibilityChanged(document.visibilityState)
  }
  componentDidMount() {
    document &&
      document.addEventListener('visibilitychange', this.eventHandler, {
        capture: true,
        passive: true,
      })
  }
  componentWillUnmount() {
    document &&
      document.removeEventListener('visibilitychange', this.eventHandler)
  }
  render() {
    return null
  }
}

export default connect(null, { visibilityChanged })(VisibilitySpy)
