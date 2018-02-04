export const debounce = (func, wait) => {
  let timeout = null
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func(...args)
    }, wait)
  }
}

export const isTouchDevice = () =>
  document && 'ontouchstart' in document.documentElement
export const isAndroid = () => navigator && /android/i.test(navigator.userAgent)
export const isiPhone = () => navigator && /iphone/i.test(navigator.userAgent)

export const isVisible = element => {
  if (!element) return false
  const domRect = element.getBoundingClientRect()
  return window.innerHeight - domRect.top > 0
}

export const scrollToElement = element => {
  if (!element) return
  const offset = (window.innerHeight - element.offsetHeight) / 2
  const scrollTop = offset < 0 ? element.offsetTop : element.offsetTop - offset
  window.scrollTo(0, scrollTop)
}

export const scrollToTop = () => window.scrollTo(0, 0)
