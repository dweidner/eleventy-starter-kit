const slugify = require('slugify');

/**
 * Convert a string into a URL slug.
 *
 * @param {string} string The string to convert.
 * @returns {string}
 */
function slug(string) {
  return slugify(string, {
    replacement: '-',
    lower: true,
    remove: /[!"'()*+.:?@~]/g
  });
}

module.exports = slug;
