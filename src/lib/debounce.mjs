/**
 * Creates a debounced version of the provided function that delays its execution
 * until after `delay` milliseconds have elapsed since the last time it was invoked.
 * Useful for reducing the rate at which a function is called.
 *
 * @param {Function} fun - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay execution.
 * @returns {Function} A debounced version of the provided function.
 *
 * @example
 * // Debounce a resize event handler
 * window.addEventListener('resize', debounce(() => {
 *   console.log('Resize event handler called')
 * }, 300))
 *
 * // Debounce a search input handler
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query)
 * }, 500)
 *
 * inputElement.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value)
 * })
 */
export function debounce (fun, delay) {
  let timeoutId
  return function (...args) {
    const that = this
    clearTimeout(timeoutId)
    const isAsync = fun.constructor.name === 'AsyncFunction'
    if (isAsync) {
      const p = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => fun.apply(that, args).then(resolve).catch(reject), delay)
      })
      return p
    } else {
      timeoutId = setTimeout(() => fun.apply(that, args), delay)
    }
  }
}

export default debounce
