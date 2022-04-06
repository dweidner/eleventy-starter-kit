const { toString } = require('lodash');

/**
 * Adds the specified string to the end of another string.
 *
 * @param {number} input The input value.
 * @param {number} string The string to append.
 * @returns {number}
 */
function append(input, string) {
  return string ? toString(input) + toString(string) : input;
}

module.exports = append;
