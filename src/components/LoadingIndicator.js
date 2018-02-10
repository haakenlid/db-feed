import React from 'react'
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

const CubeGrid = ({ stalled }) => (
  <div className={classNames({ stalled, cubeGrid: true })}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
      <Cube n={n} key={n} stalled={stalled} />
    ))}
  </div>
)

const LoadingIndicator = ({ stalled, ...props }) => (
  <div {...props} className="LoadingIndicator">
    <CubeGrid stalled={stalled} />
  </div>
)
export default LoadingIndicator
