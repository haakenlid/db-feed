import './story.css'
import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem, viewStory } from 'ducks/feed'
import { formatDate } from 'services/text'
import Vignette from 'components/Vignette'

const Lede = ({ posted, ...props }) => <span className="lede" {...props} />

const Dateline = ({ posted, host, ...props }) => (
  <div className="Dateline">
    publisert på {host} for {formatDate(posted)}
  </div>
)

const ExternalLink = ({ host, url }) => (
  <div className="ExternalLink">
    <a onClick={e => e.stopPropagation()} href={url}>
      les videre på {host}
    </a>
  </div>
)

const extract = text => text.substr(0, 200) + ' ...'

const Story = ({
  url,
  title,
  description,
  image,
  host,
  content,
  posted,
  close,
}) => (
  <div className="storyBackground" onClick={close}>
    <article className="Story">
      <div className="image" style={{ backgroundImage: `url(${image})` }}>
        <Vignette host={host} posted={posted} />
        <h1>
          <span className="title">{title}</span>
        </h1>
      </div>
      <main>
        {description && <Lede posted={posted}>{description}</Lede>}
        <Dateline posted={posted} host={host} />
        <div className="body">{extract(content)}</div>
        <ExternalLink host={host} url={url} />
      </main>
    </article>
  </div>
)

export default connect(
  (state, { id }) => selectFeedItem(id)(state),
  dispatch => ({ close: e => dispatch(viewStory(null)) })
)(Story)
