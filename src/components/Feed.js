import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import FeedStory from 'components/FeedStory'
import ScrollSpy from 'components/ScrollSpy'
import VisibilitySpy from 'components/VisibilitySpy'
import LoadingIndicator from 'components/LoadingIndicator'
import { isVisible, scrollToElement } from 'utils/misc'

export const Feed = ({
  active = [],
  fetching,
  currentStory,
  storyIsOpen,
  feedRequested,
}) => {
  const scrollHandler = element =>
    fetching || (isVisible(element) && feedRequested(true))
  const clickHandler = () => fetching || feedRequested(true)
  return (
    <section className="Feed">
      {active.map(id => (
        <FeedStory
          key={id}
          id={id}
          refFunc={!storyIsOpen && id === currentStory ? scrollToElement : null}
        />
      ))}
      <ScrollSpy onScroll={scrollHandler} />
      <LoadingIndicator onClick={clickHandler} isLoading={fetching} />
      <VisibilitySpy />
    </section>
  )
}
export default connect(selectFeed, { feedRequested })(Feed)
