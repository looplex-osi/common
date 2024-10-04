import itFromPath from './itFromPath.mjs'

/**
 * Retrieves the value at the specified path of the object. If the value doesn't exist,
 * it returns undefined or an optional default value.
 *
 * @param {Object} obj - The object to query.
 * @param {string | Array<string | number>} path - The path of the property to get.
 * @param {*} [defaultValue] - The value returned if the resolved value is undefined.
 * @returns {*} The value at the specified path.
 *
 * @example
 * const obj = { a: { b: { c: 42 } } }
 * const value = _get(obj, 'a.b.c')
 * console.log(value) // 42
 */
export function _get (obj, path, defaultValue) {
  let o = obj
  const it = itFromPath(path)
  for (let i = 0, len = it.length; i < len; i++) {
    const { key } = it[i]
    if (o == null) return defaultValue
    if (i === len - 1) return key in o ? o[key] : defaultValue
    if (!(key in o)) return defaultValue
    o = o[key]
  }
}

export default _get
