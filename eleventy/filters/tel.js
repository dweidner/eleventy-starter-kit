/**
 * Strip all non-numeric characters from a string and format a telephone.
 *
 * @param {string} value The value to process.
 * @param {string} [prefix=''] The country code to prepend.
 * @returns {string}
 */
function tel(value, prefix = '') {
  return String(prefix) + String(value)
    .toLowerCase()
    .trim()
    .replace(/\D/g, '')
    .replace(/^0/, '');
}

module.exports = tel;
