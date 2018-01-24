import React from 'react'
import { connect } from 'react-redux'
import { selectFeed } from './reducers'

const Story = ({ title = 'title', image, text = 'text' }) => (
  <article className="Story">
    <h1>{title}</h1>
    {image && <img alt={title} src={image} />}
    <p>{text}</p>
  </article>
)
const Feed = ({ feed }) => (
  <section className="Feed">
    {feed.map((props, i) => <Story key={i} {...props} />)}
  </section>
)
const mapStateToProps = state => ({ feed: selectFeed(state) })
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Feed)
