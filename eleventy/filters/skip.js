/**
 * Skip the given number of elements in a collection.
 *
 * @param {string|Array} input The collection.
 * @param {number} offset The number of elements to skip.
 * @returns {string|Array}
 */
function skip(input, offset) {
  return input.slice(offset);
}

module.exports = skip;
