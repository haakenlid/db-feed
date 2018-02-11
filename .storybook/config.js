import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs'
import { checkA11y } from '@storybook/addon-a11y'

setOptions({
  name: 'newsfeed',
  url: 'https://github.com/haakenlid/newsfeed',
  showStoriesPanel: true,
  showAddonPanel: true,
  addonPanelInRight: true,
})

addDecorator(withKnobs) // knobs!
addDecorator(checkA11y) // accessability checker

const loadStories = () => {
  require('../src/stories/index.js')
}

configure(loadStories, module)
