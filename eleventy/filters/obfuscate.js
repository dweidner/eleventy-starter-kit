/**
 * Obfuscate an email address.
 *
 * @param {string} address The email address to obfuscate.
 * @returns {string}
 */
function obfuscate(address) {
  const chars = [];

  for (let index = address.length - 1; index >= 0; index -= 1) {
    chars.unshift(['&#', address[index].codePointAt(index), ';'].join(''));
  }

  return chars.join('');
}

module.exports = obfuscate;
