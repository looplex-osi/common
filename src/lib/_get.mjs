import itFromPath from './itFromPath.mjs'

/**
 * Retrieves the value at the specified path of the object. If the value doesn't exist,
 * it returns undefined or an optional default value.
 *
 * @param {Object} obj - The object to query.
 * @param {string | Array<string | number>} path - The path of the property to get.
 * @returns {*} The value at the specified path.
 *
 * @example
 * const obj = { a: { b: { c: 42 } } }
 * const value = _get(obj, 'a.b.c')
 * console.log(value) // 42
 */
export function _get (obj, path) {
  let o = obj
  let it = itFromPath(path)
  for (let i = 0, len = it.length; i < len; i++) {
    let key = it[i]
    if (o == null) return void(0) // check for both null and undefined
    if (i === len - 1) return o[key]
    if (!(key in o)) return void 0
    o = o[key]
  }
}

export default _get
