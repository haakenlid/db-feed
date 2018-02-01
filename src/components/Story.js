import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem } from 'ducks/feed'
import { formatDate } from 'services/text'
import { Logo } from 'logos'
import './story.css'

const Lede = ({ posted, ...props }) => (
  <div className="ledeWrapper">
    <span className="lede" {...props} />
    <span className="timestamp">publisert for {formatDate(posted)}</span>
  </div>
)
const Vignette = ({ host, posted }) => (
  <div className="Vignette">
    <Logo host={host.replace('.no', '')} />
  </div>
)

const Story = ({ url, title, description, image, host, content, posted }) => (
  <article className="Story">
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <Vignette host={host} posted={posted} />
      <div className="spacer" />
      <h1>
        <a href={url}>
          <span className="title">{title}</span>
        </a>
      </h1>
      {description && <Lede posted={posted}>{description}</Lede>}
    </div>
  </article>
)

export default connect((state, { id }) => selectFeedItem(id)(state))(Story)
