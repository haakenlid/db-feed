import React from 'react'
import { connect } from 'react-redux'
import { selectOpenStory, viewStory, nextStory } from 'ducks/feed'
import { formatDate, textExtract } from 'utils/text'
import Brand from 'components/Brand'
import Chevron from 'components/Chevron'
import Swipeable from 'react-swipeable'
import { isPWA, eventHandler } from 'utils/misc'

const Link = ({ children, ...props }) => (
  <a
    {...props}
    onClick={e => e.stopPropagation()}
    target={isPWA() ? '_blank' : '_self'}
  >
    {children}
  </a>
)

export const Story = ({
  url,
  title = '[ingen tittel]',
  description = '',
  image,
  host = 'example.news.com',
  content,
  posted,
  close,
  next,
  previous,
}) =>
  !url ? null : (
    <Swipeable
      className="Story"
      onSwipedUp={next}
      onSwipedLeft={next}
      onSwipedRight={previous}
      onSwipedDown={previous}
      onClick={close}
    >
      <article className="story-wrapper">
        <div className="image" style={{ backgroundImage: `url(${image})` }}>
          <Brand host={host} />
          <h1>
            <Link className="title" href={url}>
              {title}
            </Link>
          </h1>
        </div>
        <main className="story-content">
          {description && (
            <div className="lede">{textExtract(300, description)}</div>
          )}
          <div className="dateline">
            {posted
              ? `publisert ${formatDate(posted)}`
              : 'ukjent publiseringsdato'}
          </div>
          <div className="body">
            {textExtract(350 - description.length, content)}
          </div>
        </main>
        <nav className="story-navigation">
          <div className="back" onClick={previous}>
            <Chevron />
          </div>
          <Link className="link" href={url}>
            les saken på {host}
          </Link>
          <div className="forward" onClick={next}>
            <Chevron />
          </div>
        </nav>
      </article>
    </Swipeable>
  )

export default connect(selectOpenStory, dispatch => ({
  close: eventHandler(dispatch, viewStory(null)),
  next: eventHandler(dispatch, nextStory(1)),
  previous: eventHandler(dispatch, nextStory(-1)),
}))(Story)
