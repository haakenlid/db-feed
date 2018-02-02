import React from 'react'

const debounce = (func, wait) => {
  let timeout = null
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func(...args)
    }, wait)
  }
}

class ScrollSpy extends React.Component {
  constructor(props) {
    super(props)
    const { onScroll } = props
    this.onScroll = debounce(e => onScroll(this.element), 200)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    return (
      <div className="ScrollSpy" ref={el => (this.element = el)}>
        {this.props.children}
      </div>
    )
  }
}

export default ScrollSpy
