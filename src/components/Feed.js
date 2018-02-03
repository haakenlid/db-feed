import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import LoadingIndicator from 'components/LoadingIndicator'
import { isVisible } from 'services/misc'
import classNames from 'classnames'

const Feed = ({ active, openStory, storyIsOpen, feedRequested }) => {
  const scrollHandler = element => isVisible(element) && feedRequested()

  return (
    <section className={classNames({ Feed: true, storyIsOpen })}>
      {active.map(id => (
        <FeedStory
          key={id}
          id={id}
          scrollTo={!storyIsOpen && id === openStory}
        />
      ))}
      <ScrollSpy onScroll={scrollHandler} />
      <LoadingIndicator />
    </section>
  )
}
export default connect(selectFeed, { feedRequested })(Feed)
