import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem } from 'ducks/feed'

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

export default connect((state, { id }) => selectFeedItem(id)(state))(Story)
