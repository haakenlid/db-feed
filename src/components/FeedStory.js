import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem, viewStory } from 'ducks/feed'
import { Logo } from 'logos'

const Vignette = ({ host, posted }) => (
  <div className="Vignette">
    <Logo host={host.replace('.no', '')} />
  </div>
)

const Story = ({
  viewStory,
  id,
  url,
  title,
  description,
  image,
  host,
  content,
  posted,
}) => (
  <article className="FeedStory" onClick={e => viewStory(id)}>
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <Vignette host={host} posted={posted} />
      <div className="spacer" />
      <h1>
        <span className="title">{title}</span>
      </h1>
    </div>
  </article>
)

export default connect((state, { id }) => selectFeedItem(id)(state), {
  viewStory,
})(Story)
