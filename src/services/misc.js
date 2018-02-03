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
  const domRect = element.getBoundingClientRect()
  return window.innerHeight - domRect.top > 0
}
