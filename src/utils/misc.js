// debounce function
export const debounce = (func, wait) => {
  let timeout = null
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func(...args)
    }, wait)
  }
}

// check if client is a device with touch screen
export const isTouchDevice = () =>
  document && 'ontouchstart' in document.documentElement

// check if client is an Android device
export const isAndroid = () => navigator && /android/i.test(navigator.userAgent)

// check if client is an iPhone device
export const isIphone = () => navigator && /iphone/i.test(navigator.userAgent)

// check if dom element not below the fold
export const isVisible = element => {
  if (!element) return false
  const domRect = element.getBoundingClientRect()
  return window.innerHeight - domRect.top > 0
}

// scroll to element vertically. center window on element
export const scrollToElement = element => {
  if (!element) return
  const offset = (window.innerHeight - element.offsetHeight) / 2
  const scrollTop = offset < 0 ? element.offsetTop : element.offsetTop - offset
  window.scrollTo(0, scrollTop)
}

// scroll to top of page
export const scrollToTop = () => window.scrollTo(0, 0)

// fetch image file without adding it to the dom
export const preFetchImage = ({ image }) => {
  if (!image) return
  const im = new Image()
  im.src = image
}

// event handler wrapper
export const stopPropagation = (eventHandler, ...args) => e => {
  e.stopPropagation()
  e.preventDefault()
  eventHandler(...args)
}

// :: Int -> String|Number -> String
export const addMinutes = (minutes = 30) => timestamp =>
  new Date(new Date(timestamp).valueOf() + 1000 * 60 * minutes).toISOString()
