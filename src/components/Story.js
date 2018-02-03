import React from 'react'
import { connect } from 'react-redux'
import { selectOpenStory, viewStory, nextStory } from 'ducks/feed'
import { formatDate, textExtract } from 'services/text'
import Vignette from 'components/Vignette'

const Lede = ({ posted, ...props }) => <span className="lede" {...props} />

const Dateline = ({ posted, ...props }) => (
  <div className="Dateline">publisert for {formatDate(posted)}</div>
)

const Chevron = props => (
  <svg
    className="Chevron"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    {...props}
  >
    <path d="M120.4 512.98l192-192-192-192 128-128 320 320-320 320z" />
  </svg>
)
const ExternalLink = ({ host, url }) => (
  <a className="ExternalLink" onClick={e => e.stopPropagation()} href={url}>
    les saken på {host}
  </a>
)

const Story = ({
  url,
  title,
  description,
  image,
  host,
  content,
  posted,
  close,
  next,
  previous,
}) =>
  !url ? null : (
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
          <Dateline posted={posted} />
          <div className="body">
            {textExtract(350 - description.length, content)}
          </div>
        </main>
        <nav className="navigate">
          <div className="back" onClick={previous}>
            <Chevron />
          </div>
          <ExternalLink host={host} url={url} />
          <div className="forward" onClick={next}>
            <Chevron />
          </div>
        </nav>
      </article>
    </div>
  )

const eventListener = fn => e => {
  e.preventDefault()
  e.stopPropagation()
  fn(e)
}

export default connect(selectOpenStory, dispatch => ({
  close: eventListener(e => dispatch(viewStory(null))),
  next: eventListener(e => dispatch(nextStory(1))),
  previous: eventListener(e => dispatch(nextStory(-1))),
}))(Story)
