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

const Chevron = () => (
  <svg
    style={{ verticalAlign: '-15%', height: '1em', fill: 'currentColor' }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
  >
    <path d="M120.4 512.98l192-192-192-192 128-128 320 320-320 320z" />
  </svg>
)
const ExternalLink = ({ host, url }) => (
  <a className="ExternalLink" onClick={e => e.stopPropagation()} href={url}>
    les videre på {host} <Chevron />
  </a>
)

const extract = text => text.substr(0, 300).replace(/([.?])[^.?]*$/, '$1')

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
      </main>
      <ExternalLink host={host} url={url} />
    </article>
  </div>
)

export default connect(
  (state, { id }) => selectFeedItem(id)(state),
  dispatch => ({ close: e => dispatch(viewStory(null)) })
)(Story)
