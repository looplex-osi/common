/**
 * Converts a given string to its ASCII representation.
 *
 * This function normalizes the string to NFKD form, removes diacritical marks, and filters out non-ASCII characters.
 * It ensures that the resulting string only contains characters with char codes less than 255.
 *
 * @param {string} str - The string to be converted to ASCII.
 * @returns {string} The ASCII representation of the string.
 *
 * @see [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
 * @see [Unicode character class escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape)
 */
function asciiFrom (str) {
  if (typeof str !== 'string') return ''
  return str
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^ 0-0a-zA-Z]/gi, '')
    .trim()
}

export default asciiFrom
