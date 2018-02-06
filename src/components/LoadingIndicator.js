import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import classNames from 'classnames'

class Cube extends React.Component {
  constructor(props) {
    super(props)
    this.state = { quiet: false }
    this.handleAnimate = this.handleAnimate.bind(this)
  }
  handleAnimate(e) {
    if (!this.props.stalled) return
    this.setState({ quiet: true })
  }
  componentWillReceiveProps({ stalled }) {
    if (stalled) return
    this.setState({ quiet: false })
  }
  render() {
    return (
      <div
        className={classNames('cube', `cube${this.props.n}`, this.state)}
        onAnimationIteration={this.handleAnimate}
      />
    )
  }
}

const Loader = ({ stalled }) => (
  <div className={classNames({ stalled, cubeGrid: true })}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
      <Cube n={n} key={n} stalled={stalled} />
    ))}
  </div>
)

const LoadingIndicator = ({ fetching, active, feedRequested }) => (
  <div
    title="klikk for å laste på nytt"
    className="LoadingIndicator"
    onClick={() => feedRequested()}
  >
    <Loader stalled={!fetching} />
  </div>
)
export default connect(selectFeed, { feedRequested })(LoadingIndicator)
