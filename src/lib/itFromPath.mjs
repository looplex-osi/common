/**
 * Converts a string path into an array of keys.
 *
 * This function parses a string representing a path to a property in an object
 * and converts it into an array of keys for property access. The path can include
 * dot notation, bracket notation with numbers, and bracket notation with quoted strings.
 *
 * @param {string} path - The path string to convert.
 * @returns {Array<string|number>} - The array of keys representing the path.
 *
 * @example
 * itFromPath('a.b.c'); // returns ['a', 'b', 'c']
 * itFromPath('a[0].b'); // returns ['a', '0', 'b']
 * itFromPath('a["b"].c'); // returns ['a', 'b', 'c']
 * itFromPath("a['b'].c"); // returns ['a', 'b', 'c']
 */
export function itFromPath (path) {
  if (path === '') return [{ key: '', isArrayIndex: false }]
  const it = []
  const re = /([^.[\]]+)|\[(\d+)\]|(?:\["([^"]+)"\])|(?:\['([^']+)'\])/g
  let match
  while ((match = re.exec(path)) !== null) {
    if (match[1] !== undefined) {
      // property name in dot notation
      it.push({ key: match[1], isArrayIndex: false })
    } else if (match[2] !== undefined) {
      // number inside brackets
      it.push({ key: match[2], isArrayIndex: true })
    } else if (match[3] !== undefined) {
      // double-quoted property inside brackets
      it.push({ key: match[3], isArrayIndex: false })
    } else {
      // single-quoted property inside brackets
      it.push({ key: match[4], isArrayIndex: false })
    }
  }
  return it
}

export default itFromPath
