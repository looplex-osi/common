import asciiFrom from './asciiFrom.mjs'

/**
 * Converts a given string to camel case.
 *
 * Camel case is a string format where each word after the first is capitalized and all words are joined together without spaces.
 * For example, "Hello World" becomes "helloWorld".
 * More information about camel case can be found on MDN: https://developer.mozilla.org/en-US/docs/Glossary/Camel_case
 *
 * @param {string} str - The string to be converted to camel case.
 * @returns {string} The camel-cased string.
 */
function camelCaseFrom (str) {
  return asciiFrom(str)
    .toLowerCase()
    .split(/\s+/g)
    .map((t, i) => i <= 0 ? t : `${t.charAt(0).toUpperCase()}${t.slice(1)}`)
    .join('')
}

export default camelCaseFrom
