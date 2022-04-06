/**
 * Creates a new array containing only a specified number of elements.
 *
 * @param {string|Array} input The input to modify.
 * @param {number} limit Number of items to keep.
 * @returns {string|Array}
 */
function take(input, limit) {
  if (!Number.isFinite(limit)) {
    return input;
  }

  return input.slice(0, Math.min(limit, input.length));
}

module.exports = take;
