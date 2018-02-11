import React from 'react'
import { storiesOf } from '@storybook/react'
import LoadingIndicator from 'components/LoadingIndicator'

class LoaderWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
    this.clickHandler = this.clickHandler.bind(this)
  }
  clickHandler(e) {
    this.setState({ isLoading: !this.state.isLoading })
  }
  render() {
    const { isLoading } = this.state
    return (
      <LoadingIndicator isLoading={isLoading} onClick={this.clickHandler}>
        <h2>{`click to ${isLoading ? 'stop' : 'start'} loading indicator`}</h2>
      </LoadingIndicator>
    )
  }
}

storiesOf('LoadingIndicator', module)
  .add('loading', () => <LoadingIndicator isLoading={true} />)
  .add('stopped', () => <LoadingIndicator isLoading={false} />)
  .add('interactive', () => <LoaderWrapper />)
