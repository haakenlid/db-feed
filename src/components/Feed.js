import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import VisibilitySpy from 'components/VisibilitySpy'
import LoadingIndicator from 'components/LoadingIndicator'
import { isVisible } from 'utils/misc'
import classNames from 'classnames'

const Feed = ({ active, fetching, openStory, storyIsOpen, feedRequested }) => {
  const scrollHandler = element =>
    fetching || (isVisible(element) && feedRequested(true))
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
      <VisibilitySpy />
    </section>
  )
}
export default connect(selectFeed, { feedRequested })(Feed)
