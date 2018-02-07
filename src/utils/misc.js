// animation frame based debounce function
export const debounce = (func, wait) => {
  let minutes = null
  return (...args) => {
    minutes && window.cancelAnimationFrame(minutes)
    minutes = window.requestAnimationFrame(() => {
      minutes = null
      func(...args)
    })
  }
}
// minutes based debounce function
export const _debounce = (func, wait) => {
  let minutes = null
  return (...args) => {
    minutes && clearTimeout(minutes)
    minutes = setTimeout(() => {
      minutes = null
      func(...args)
    }, 100)
  }
}

// check if client is a device with touch screen
export const isTouchDevice = () =>
  document && 'ontouchstart' in document.documentElement

// check if client is an Android device
export const isAndroid = () => navigator && /android/i.test(navigator.userAgent)

// check if page is running as standalone Progressive Web App
export const isPWA = () =>
  window && window.matchMedia('(display-mode: standalone)').matches

// check if client is an iPhone device
export const isIphone = () => navigator && /iphone/i.test(navigator.userAgent)

// check if dom element not below the fold
export const isVisible = element => {
  if (!element) return false
  return window.scrollY + window.innerHeight > element.offsetTop
}

// scroll to element vertically. center window on element
export const scrollToElement = element => {
  if (!element) return
  const offset = (window.innerHeight - element.offsetHeight) / 2
  const scrollTop = offset < 0 ? element.offsetTop : element.offsetTop - offset
  window.scrollTo(0, scrollTop)
}

// scroll to top of page
export const scrollToTop = () => window.scrollTo(window.scrollX, 0)

// fetch image file without adding it to the dom
export const preFetchImage = ({ image }) => {
  if (!image) return
  const im = new Image()
  im.src = image
}

// event handler wrapper
export const eventHandler = (eventHandler, ...args) => e => {
  e.stopPropagation()
  e.preventDefault()
  eventHandler(...args)
}

// check if timestamp is stale
// :: Number -> String|Number -> Boolean
export const staleAfter = minutes => timestamp =>
  Date.now() - new Date(timestamp).valueOf() > minutes * 1000 * 60
