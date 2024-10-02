/**
 * Converts a string path into an array of keys.
 *
 * This function parses a string representing a path to a property in an object
 * and converts it into an array of keys for property access. The path can include
 * dot notation, bracket notation with numbers, and bracket notation with quoted strings.
 *
 * @param {string|Array<string|number>} path - The path string to convert.
 * @returns {Array<string|number>} - The array of keys representing the path.
 *
 * @example
 * itFromPath('a.b.c'); // returns ['a', 'b', 'c']
 * itFromPath('a[0].b'); // returns ['a', '0', 'b']
 * itFromPath('a["b"].c'); // returns ['a', 'b', 'c']
 * itFromPath("a['b'].c"); // returns ['a', 'b', 'c']
 * itFromPath(['a', 'b', 'c']); // returns ['a', 'b', 'c']
 */
export function itFromPath(path) {
  if (Array.isArray(path)) return path
  let it = []
  let re = /[^.[\]]+|\[(?:(\d+)|['"]([^'"]+)['"])\]/g
  let match
  while ((match = re.exec(path)) !== null) {
    if (match[1] !== undefined) {
      // number inside brackets
      it.push(match[1])
    } else if (match[2] !== undefined) {
      // quoted property name inside brackets
      it.push(match[2])
    } else {
      // property name in dot notation
      it.push(match[0])
    }
  }
  return it;
}

export default itFromPath
