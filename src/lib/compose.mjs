export default function compose (middlewares) {
  if (!Array.isArray(middlewares))
    throw new TypeError('middlewares stack MUST be an array!')
  for (const middleware of middlewares) {
    if (typeof middleware !== 'function')
      throw new TypeError('middlewares MUST be composed of functions!')
  }
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'))
      index = i
      const middleware = i === middlewares.length ? next : middlewares[i]
      if (!middleware) return Promise.resolve()
      try {
        return Promise.resolve(middleware(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
