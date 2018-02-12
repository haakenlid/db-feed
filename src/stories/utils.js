import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import loremHipsum from 'lorem-hipsum'
import placeholderImg from './26-kult-astroillustrasjon2_HL.jpg'

import feed from 'ducks/feed'
import tags from 'ducks/tags'
import hosts from 'ducks/hosts'
import initialState from './store.fixture.json'

const configureStore = () =>
  createStore(combineReducers({ feed, hosts, tags }), initialState)

export const TestProvider = ({ children }) => (
  <Provider store={configureStore()}>{children}</Provider>
)

const IMAGE_API_URL = 'https://source.unsplash.com/random/600x600'
export const fetchRandomImage = () =>
  fetch(IMAGE_API_URL)
    .catch(e => Promise.reject({ error: e.toString() }))
    .then(
      ({ ok, url, statusText }) =>
        ok ? { image: url } : Promise.reject({ error: statusText })
    )

const random = {
  sentences: n => loremHipsum({ count: n, units: 'sentences' }),
  words: n => loremHipsum({ count: n, units: 'word' }),
  date: hours => new Date(Date.now() - Math.random() * hours * 60 * 60 * 1000),
  int: max => Math.ceil(Math.random() * max),
  choice: arr => arr[random.int(arr.length) - 1],
}

export const baseProps = {
  host: 'dagbladet.no',
  title: 'Tumblr Williamsburg normcore asymmetrical street art',
  description:
    'Sriracha meggings artisan jean shorts cliche brunch Helvetica tote bag vinyl.',
  content:
    'Thundercats lomo art party tofu retro pork belly. Sustainable Schlitz asymmetrical craft beer kitsch tofu gluten-free pour-over banh mi tousled artisan cliche trust fund Cosby sweater Odd Future. Fingerstache mustache iPhone normcore banh mi pug lo-fi craft beer Vice mustache fixie pop-up.',
  url: 'https://example.com/story',
  posted: new Date('2018-02-05'),
  image: placeholderImg,
}

export const randomProps = () => ({
  title: random.words(random.choice([1, 2, 2, 3, 5, 10])),
  description: random.sentences(random.int(3) - 1),
  content: random.sentences(5),
  posted: random.date(48),
  host: random.choice([
    'vg.no',
    'dagbladet.no',
    'nrk.no',
    'bt.no',
    'abcnyheter.no',
    'tv2.no',
    'adressa.no',
  ]),
})
