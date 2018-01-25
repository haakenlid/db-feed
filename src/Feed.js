import React from 'react'
import { connect } from 'react-redux'
import { selectFeed } from './reducers'

const Story = ({ title, description, image, host, content }) => (
  <article className="Story">
    <h1>
      {host}: {title}
    </h1>
    <h3>{description}</h3>
    {image && <img alt={title} src={image} />}
    <pre>{content}</pre>
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
