import React from 'react'
import { connect } from 'react-redux'
import { selectFeed } from 'ducks/feed'
import Story from 'components/Story'

const Feed = ({ active }) => (
  <section className="Feed">
    {active.map(id => <Story key={id} id={id} />)}
  </section>
)
export default connect(selectFeed)(Feed)
