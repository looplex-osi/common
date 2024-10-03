/**
 * Creates a throttled version of the provided function that only invokes the function
 * at most once every `wait` milliseconds. Subsequent calls within the `wait` period
 * are ignored.
 *
 * @param {Function} fun - The function to throttle.
 * @param {number} wait - The number of milliseconds to wait before allowing the next call.
 * @returns {Function} A throttled version of the provided function.
 *
 * @example
 * // Throttle a scroll event handler
 * window.addEventListener('scroll', throttle(() => {
 *   console.log('Scroll event handler called');
 * }, 200));
 */
export function throttle (fun, wait) {
  let lastCall = 0
  return function(...args) {
    let now = Date.now()
    if (now - lastCall >= wait) {
      lastCall = now
      return fun.apply(this, args)
    }
  }
}

export default throttle
