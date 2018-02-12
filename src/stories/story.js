import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'components/Story'
import { text, date, button } from '@storybook/addon-knobs'
import { baseProps, randomProps, fetchRandomImage } from './utils'

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'click the "random" button to generate random content',
      description: 'You can find the button in the Knobs panel to the right.',
      url: '#',
    }
  }
  changeProps() {
    const setState = this.setState.bind(this)
    setState(randomProps())
    setState({ image: '' })
    fetchRandomImage().then(setState, console.error)
  }
  render() {
    button('random', () => this.changeProps())
    return Story(this.state)
  }
}

storiesOf('Story', module)
  .addWithJSX('with props', () => {
    const props = {
      host: text('host', baseProps.host),
      title: text('title', baseProps.title),
      description: text('description', baseProps.description),
      content: text('content', baseProps.content),
      url: text('url', baseProps.url),
      posted: date('posted', baseProps.posted),
      image: text('image', baseProps.image),
    }
    return props.url ? (
      <Story {...props} />
    ) : (
      <h2>Enter a url in the Knobs panel</h2>
    )
  })
  .add('randomize', () => <StoryWrapper />)
