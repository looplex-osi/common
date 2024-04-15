export default function compose (middlewares) {
  if (!Array.isArray(middlewares)) {
    throw new TypeError('middlewares stack MUST be an array!')
  }
  for (const middleware of middlewares) {
    if (typeof middleware !== 'function') {
      throw new TypeError('middlewares MUST be composed of functions!')
    }
  }
  return function (context, next) {
    function dispatch (i) {
      const middleware = i === middlewares.length ? next : middlewares[i]
      if (!middleware) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(middleware(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}
