import asciiFrom from './asciiFrom.mjs'

/**
 * Converts a given string to snake case.
 *
 * Snake case is a string format where each word is lowercase and separated by an underscore.
 * For example, "Hello World" becomes "hello_world".
 * More information about snake case can be found on MDN: https://developer.mozilla.org/en-US/docs/Glossary/Snake_case
 *
 * @param {string} str - The string to be converted to snake case.
 * @returns {string} The snake-cased string.
 */
function snakeCaseFrom (str) {
  return asciiFrom(str)
    .toLowerCase()
    .split(/\s+/g)
    .join('_')
}

export default snakeCaseFrom
