import React from 'react'
import { connect } from 'react-redux'
import { selectOpenStory, viewStory, nextStory } from 'ducks/feed'
import { formatDate, textExtract } from 'utils/text'
import Vignette from 'components/Vignette'
import Chevron from 'components/Chevron'
import Swipeable from 'react-swipeable'

const Lede = ({ posted, ...props }) => <span className="lede" {...props} />

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
    <Swipeable
      onSwipedUp={next}
      onSwipedLeft={next}
      onSwipedRight={previous}
      onSwipedDown={previous}
    >
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
            <div className="Dateline">publisert for {formatDate(posted)}</div>
            <div className="body">
              {textExtract(350 - description.length, content)}
            </div>
          </main>
          <nav className="navigate">
            <div className="back" onClick={previous}>
              <Chevron />
            </div>
            <a
              className="ExternalLink"
              onClick={e => e.stopPropagation()}
              href={url}
            >
              les saken på {host}
            </a>
            <div className="forward" onClick={next}>
              <Chevron />
            </div>
          </nav>
        </article>
      </div>
    </Swipeable>
  )

const event = fn => e => {
  e.preventDefault()
  e.stopPropagation()
  fn(e)
}

export default connect(selectOpenStory, dispatch => ({
  close: event(e => dispatch(viewStory(null))),
  next: event(e => dispatch(nextStory(1))),
  previous: event(e => dispatch(nextStory(-1))),
}))(Story)
