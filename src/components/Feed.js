import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import Story from 'components/Story'
import LoadingIndicator from 'components/LoadingIndicator'
import { isVisible } from 'services/misc'

const Feed = ({ active, selected, feedRequested }) => {
  const scrollHandler = element => isVisible(element) && feedRequested()

  return (
    <section className="Feed">
      {selected && <Story id={selected} />}
      {active.map(id => <FeedStory key={id} id={id} />)}
      <ScrollSpy onScroll={scrollHandler} />
      <LoadingIndicator />
    </section>
  )
}
export default connect(selectFeed, { feedRequested })(Feed)
