import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem, viewStory } from 'ducks/feed'
import Brand from 'components/Brand'
import { scrollToElement } from 'utils/misc'

const FeedStory = ({
  viewStory,
  id,
  url,
  title,
  description,
  image,
  host,
  content,
  posted,
  scrollTo,
}) => (
  <article
    ref={scrollTo ? scrollToElement : null}
    className="FeedStory"
    onClick={e => viewStory(id)}
  >
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <Brand host={host} posted={posted} />
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
