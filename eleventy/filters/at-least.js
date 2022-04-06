/**
 * Limits a number to a minimum value.
 *
 * @param {number} input The input value.
 * @param {number} minimum The minimum value.
 * @returns {number}
 */
function atLeast(input, minimum) {
  return input > minimum ? Number(input) : Number(minimum);
}

module.exports = atLeast;
