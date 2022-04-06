/**
 * Find the end of the excerpt.
 *
 * @param {string} content The content to search within.
 * @param {number} [length=160] The minimum length of the excerpt.
 * @returns {number}
 */
function findEnd(content, length = 160) {
  if (!content || content.length === 0) {
    return 0;
  }

  const position = content.indexOf('</p>') + 4;

  if (position < length) {
    return position + findEnd(content.slice(position), length);
  }

  return position;
}

/**
 * Generate an excerpt from the given content string.
 *
 * @param {string} content The content to generate the excerpt from.
 * @param {number} [length=160] The minimum length of the excerpt.
 * @param {string} [separator='<!--more-->'] A string separating the excerpt from the rest.
 * @returns {string}
 */
function excerpt(content, length = 160, separator = '<!--more-->') {
  if (!content) {
    return '';
  }

  if (content.includes(separator)) {
    return content.slice(0, content.indexOf(separator));
  }

  if (content.length < length) {
    return content;
  }

  return content.slice(0, findEnd(content, length));
}

module.exports = excerpt;
