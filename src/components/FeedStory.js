import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem, viewStory } from 'ducks/feed'
import Brand from 'components/Brand'

export const FeedStory = ({
  viewStory,
  title,
  description,
  image,
  host,
  refFunc,
  id,
}) => (
  <article ref={refFunc} className="FeedStory" onClick={e => viewStory(id)}>
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <Brand host={host} />
      <div className="spacer" />
      <h1>
        <span className="title">{title}</span>
      </h1>
    </div>
  </article>
)

export default connect((state, { id }) => selectFeedItem(id)(state), {
  viewStory,
})(FeedStory)
