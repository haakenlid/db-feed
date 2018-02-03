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

export const isVisible = element => {
  if (!element) return false
  const domRect = element.getBoundingClientRect()
  return window.innerHeight - domRect.top > 0
}

export const scrollToElement = element => {
  if (!element) return
  const domRect = element.getBoundingClientRect()
  const offset = (window.innerHeight - domRect.height) / 2
  const scrollTop = offset > 0 ? domRect.top - offset : domRect.top
  window.scrollTo(0, scrollTop)
}

export const scrollToTop = () => window.scrollTo(0, 0)
