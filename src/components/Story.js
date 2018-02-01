import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem } from 'ducks/feed'
import { formatDate } from 'services/text'
import './story.css'

const Story = ({ title, description, image, host, content, posted }) => (
  <article
    className="Story"
    style={{
      backgroundImage: `url(${image})`,
    }}
  >
    <p>{`${host} / ${formatDate(posted)} /`}</p>
    <h1>
      <span>{title}</span>
    </h1>
    <h3>{description}</h3>
  </article>
)

export default connect((state, { id }) => selectFeedItem(id)(state))(Story)
