import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem } from 'ducks/feed'
import { formatDate } from 'services/text'
import { Logo } from 'logos'
import './story.css'

const Lede = props => (
  <div className="ledeWrapper">
    <span className="lede" {...props} />
  </div>
)
const Vignette = ({ host, posted }) => (
  <div class="Vignette">
    <Logo host={host.replace('.no', '')} />
  </div>
)

const Story = ({ url, title, description, image, host, content, posted }) => (
  <article className="Story">
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <Vignette host={host} posted={posted} />
      <div class="spacer" />
      <h1>
        <a href={url}>
          <span className="title">{title}</span>
        </a>
      </h1>
      {description && <Lede>{description}</Lede>}
    </div>
  </article>
)

export default connect((state, { id }) => selectFeedItem(id)(state))(Story)
