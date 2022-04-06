/**
 * Limits a number to a maximum value.
 *
 * @param {number} input The input value.
 * @param {number} maximum The maximum value.
 * @returns {number}
 */
function atMost(input, maximum) {
  return input < maximum ? Number(input) : Number(maximum);
}

module.exports = atMost;
