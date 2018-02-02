import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import LoadingIndicator from 'components/LoadingIndicator'
import './feed.css'

const isVisible = element => {
  const rect = element.getBoundingClientRect()
  return window.innerHeight - rect.top > -500
}

const Feed = ({ active, feedRequested }) => (
  <section className="Feed">
    {active.map(id => <FeedStory key={id} id={id} />)}
    <ScrollSpy onScroll={el => isVisible(el) && feedRequested()}>
      <LoadingIndicator />
    </ScrollSpy>
  </section>
)
export default connect(selectFeed, { feedRequested })(Feed)
