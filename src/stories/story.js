import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'components/Story'
import placeholderImage from './26-kult-astroillustrasjon2_HL.jpg'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim erat ut nulla vulputate faucibus. Sed vel justo eget est maximus blandit. In hac habitasse platea dictumst. Suspendisse sit amet malesuada leo, ac fermentum justo. Cras sed ante ornare, rhoncus neque non, egestas tellus. Donec est lorem, posuere eget dui at, posuere sodales nibh. Fusce pellentesque augue justo, in facilisis nunc pharetra a. Morbi elementum enim et risus cursus, et semper sapien vestibulum. In porttitor lectus eros, a maximus sapien convallis quis. Ut euismod risus vel metus volutpat sagittis. Sed mollis dapibus metus, et efficitur tortor finibus a. Praesent molestie orci nisl, vel malesuada quam sodales ut. Sed elementum purus neque, nec gravida velit malesuada at.'

storiesOf('Story', module)
  .add('without props', () => <Story url="." />)
  .add('with props', () => (
    <Story
      url="#"
      image={placeholderImage}
      title="Stjernekrig"
      description={lorem.substr(0, 50)}
      host="vg"
      content={lorem}
      posted="1973"
    />
  ))
