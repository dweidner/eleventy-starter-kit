/**
 * Stringify the given data as JSON, safe to be used in an HTML attribute.
 *
 * @param  {object} data The data object to escape.
 * @param  {object} options Additional options.
 * @returns {string}
 */
function jsonAttribute(data, options = {}) {
  if (data === undefined) {
    data = '';
  } else if (typeof data === 'object') {
    data = JSON.stringify(data);
  }

  data = data.replace(/&/g, '&amp;');
  data = data.replace(/</g, '&lt;');
  data = data.replace(/>/g, '&gt;');

  data = options.single ? data.replace(/'/g, '&#39;') : data.replace(/"/g, '&#34;');

  return data;
}

module.exports = jsonAttribute;
