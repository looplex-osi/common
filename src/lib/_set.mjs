import itFromPath from './itFromPath.mjs'

/**
 * Sets the value at the specified path of the object. If a portion of the path doesn't exist,
 * it's created. Arrays are created for numeric indices, objects for keys.
 *
 * @param {Object} obj - The object to modify.
 * @param {string | Array<string | number>} path - The path of the property to set.
 * @param {*} value - The value to set.
 * @returns {Object} The modified object.
 *
 * @example
 * const obj = {}
 * _set(obj, 'a.b.c', 42)
 * console.log(obj) // { a: { b: { c: 42 } } }
 *
 * _set(obj, 'x[0].y', 'value')
 * console.log(obj) // { a: { b: { c: 42 } }, x: [ { y: 'value' } ] }
 */
export function _set (obj, path, value) {
  let o = obj
  let it = itFromPath(path)
  for (let i = 0, len = it.length; i < len; i++) {
    let key = it[i]
    if (i === len - 1) {
      // last key, set the value
      o[key] = value
    } else {
      // if the key doesn't exist or is not an object, create it
      if (!(key in o) || typeof o[key] !== 'object' || o[key] === null) {
        let nextKey = it[i + 1]
        o[key] = (/^\d+$/).test(nextKey) ? [] : {}
      }
      // walk
      o = o[key]
    }
  }
}

export default _set
