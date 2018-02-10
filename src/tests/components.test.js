import React from 'react'
import renderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'

import Brand from 'components/Brand'
import LoadingIndicator from 'components/LoadingIndicator'
import ScrollSpy from 'components/ScrollSpy'
import GoToTop from 'components/GoToTop'

import { Feed } from 'components/Feed'
import { FeedStory } from 'components/FeedStory'
import { Filters } from 'components/Filters'
import { Story } from 'components/Story'
import Page from 'components/Page'

describe('Brand', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Brand host="dagbladet" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('FeedStory', () => {
  test('renders correctly', () => {
    const props = {
      title: 'Title of the story',
      description: 'Shocking lede: Some news happened!',
      image: 'https://newspaper.com/image.jpg',
      host: 'newspaper.com',
    }
    const tree = renderer.create(<FeedStory {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Story', () => {
  test('renders correctly', () => {
    const props = {
      url: 'http://example.com/news/breaking-news-shock',
      title: 'Title of the story',
      description: 'Shocking lede: Some news happened!',
      image: 'https://bt.no/bilder/image.jpg',
      host: 'bt.no',
      content: 'bla bla bla bla',
      posted: '1970-01-01',
    }
    const tree = renderer.create(<Story {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Filters', () => {
  test('renders correctly', () => {
    const props = {
      hosts: { ap: true, db: true, vg: false },
      tags: { nyheter: false, sport: false, kultur: true },
    }
    const tree = renderer.create(<Filters {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Feed', () => {
  test('renders correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Feed />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})

describe('Page', () => {
  test('renders correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Page />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})

describe('ScrollSpy', () => {
  test('renders correctly', () => {
    const props = { scrollHandler: console.log }
    const tree = renderer
      .create(
        <ScrollSpy {...props}>
          <hr />
        </ScrollSpy>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('GoToTop', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<GoToTop />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('LoadingIndicator', () => {
  test('renders correctly', () => {
    const props = { stalled: true, title: 'click to reload' }
    const tree = renderer.create(<LoadingIndicator {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
