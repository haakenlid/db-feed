import React from 'react'
import { connect } from 'react-redux'
import { visibilityChanged } from 'ducks/feed'

// This component's only purpose is to dispatch an action when the app is
// re-opened in a tab or web view. Then we can check if the newsfeed is stale
// and should be re-fetched from the web backend server.
class VisibilitySpy extends React.Component {
  constructor(props) {
    if (props.children) throw new Error("VisibilitySpy doesn't accept children")
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
