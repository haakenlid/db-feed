import React from 'react'
import { connect } from 'react-redux'
import { selectFeed, feedRequested } from 'ducks/feed'
import Story from 'components/Story'
import ScrollSpy from 'components/ScrollSpy'

const isVisible = element => {
  const rect = element.getBoundingClientRect()
  return window.innerHeight - rect.top
}

const Feed = ({ active, feedRequested }) => (
  <section className="Feed">
    {active.map(id => <Story key={id} id={id} />)}
    <ScrollSpy onScroll={el => isVisible(el) > 0 && feedRequested()}>
      <button onClick={e => feedRequested()}>load more</button>
    </ScrollSpy>
  </section>
)
export default connect(selectFeed, { feedRequested })(Feed)
