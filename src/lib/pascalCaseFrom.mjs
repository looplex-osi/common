import asciiFrom from './asciiFrom.mjs'

/**
 * Converts a given string to Pascal case.
 *
 * Pascal case is a string format where each word is capitalized and all words are joined together without spaces.
 * For example, "Hello World" becomes "HelloWorld".
 *
 * @param {string} str - The string to be converted to Pascal case.
 * @returns {string} The Pascal-cased string.
 */
function pascalCaseFrom (str) {
  return asciiFrom(str)
    .toLowerCase()
    .split(/\s+/g)
    .map(t => `${t.charAt(0).toUpperCase()}${t.slice(1)}`)
    .join('')
}

export default pascalCaseFrom
