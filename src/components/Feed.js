import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import Story from 'components/Story'
import LoadingIndicator from 'components/LoadingIndicator'
import './feed.css'

const isVisible = element => {
  const rect = element.getBoundingClientRect()
  return window.innerHeight - rect.top > -500
}

const Feed = ({ active, feedRequested, selected }) => (
  <section className="Feed">
    {selected && <Story id={selected} />}
    {active.map(id => <FeedStory key={id} id={id} />)}
    <ScrollSpy onScroll={el => isVisible(el) && feedRequested()} />
    <LoadingIndicator />
  </section>
)
export default connect(selectFeed, { feedRequested })(Feed)
