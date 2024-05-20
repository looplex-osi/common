import asciiFrom from './asciiFrom.mjs'

/**
 * Converts a given string to kebab case.
 *
 * Kebab case is a string format where each word is lowercase and separated by a hyphen.
 * For example, "Hello World" becomes "hello-world".
 * More information about kebab case can be found on MDN: https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case
 *
 * @param {string} str - The string to be converted to kebab case.
 * @returns {string} The kebab-cased string.
 */
function kebabCaseFrom (str) {
  return asciiFrom(str)
    .toLowerCase()
    .split(/\s+/g)
    .join('-')
}

export default kebabCaseFrom
