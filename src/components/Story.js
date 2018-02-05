import React from 'react'
import { connect } from 'react-redux'
import { selectOpenStory, viewStory, nextStory } from 'ducks/feed'
import { formatDate, textExtract } from 'utils/text'
import Brand from 'components/Brand'
import Chevron from 'components/Chevron'
import Swipeable from 'react-swipeable'
import { isAndroid, stopPropagation } from 'utils/misc'

const Lede = ({ posted, ...props }) => <span className="lede" {...props} />

const Link = ({ children, ...props }) => (
  <a
    {...props}
    onClick={e => e.stopPropagation()}
    target={isAndroid() ? '_blank' : '_self'}
  >
    {children}
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
    <Swipeable
      onSwipedUp={next}
      onSwipedLeft={next}
      onSwipedRight={previous}
      onSwipedDown={previous}
    >
      <div className="storyBackground" onClick={close}>
        <article className="Story">
          <div className="image" style={{ backgroundImage: `url(${image})` }}>
            <Brand host={host} posted={posted} />
            <h1>
              <Link className="title" href={url} target="_blank">
                {title}
              </Link>
            </h1>
          </div>
          <main>
            {description && (
              <Lede posted={posted}>{textExtract(200, description)}</Lede>
            )}
            <div className="Dateline">publisert for {formatDate(posted)}</div>
            <div className="body">
              {textExtract(350 - description.length, content)}
            </div>
          </main>
          <nav className="navigate">
            <div className="back" onClick={previous}>
              <Chevron />
            </div>
            <Link className="ExternalLink" href={url}>
              les saken på {host}
            </Link>
            <div className="forward" onClick={next}>
              <Chevron />
            </div>
          </nav>
        </article>
      </div>
    </Swipeable>
  )

export default connect(selectOpenStory, dispatch => ({
  close: stopPropagation(dispatch, viewStory(null)),
  next: stopPropagation(dispatch, nextStory(1)),
  previous: stopPropagation(dispatch, nextStory(-1)),
}))(Story)
