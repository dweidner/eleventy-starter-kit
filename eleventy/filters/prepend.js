const { toString } = require('lodash');

/**
 * Adds the specified string to the beginning of another string.
 *
 * @param {number} input The input value.
 * @param {number} string The string to append.
 * @returns {number}
 */
function prepend(input, string) {
  return string ? toString(input) + toString(string) : input;
}

module.exports = prepend;
