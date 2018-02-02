import './story.css'
import React from 'react'
import { connect } from 'react-redux'
import { selectFeedItem, viewStory } from 'ducks/feed'
import { formatDate } from 'services/text'
import { Logo } from 'logos'

const Lede = ({ posted, ...props }) => <span className="lede" {...props} />

const Dateline = ({ posted, ...props }) => (
  <div className="Dateline">publisert for {formatDate(posted)}</div>
)

const Vignette = ({ host, posted }) => (
  <div className="Vignette">
    <Logo host={host.replace('.no', '')} />
  </div>
)

const extract = text => text.substr(0, 1000) + ' ...'

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
        <Dateline posted={posted} />
        {description && <Lede posted={posted}>{description}</Lede>}
        <div className="body">{extract(content)}</div>
      </main>
    </article>
  </div>
)

export default connect(
  (state, { id }) => selectFeedItem(id)(state),
  dispatch => ({ close: e => dispatch(viewStory(null)) })
)(Story)
