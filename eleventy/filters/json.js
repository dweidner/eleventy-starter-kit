/**
 * Stringify the given data as JSON and escape any string sequences that would
 * cause a `script` tag to end prematurely.
 *
 * @param {object} data The data object to escape.
 * @returns {string}
 */
function json(data) {
  if (data === undefined) {
    return 'null';
  }

  data = JSON.stringify(data);
  data = data.replace(/<!--/g, '<\\!--');
  data = data.replace(/<\/script>/gi, '<\\/script>');
  data = data.replace(/\u2028/g, '\\u2028');
  data = data.replace(/\u2029/g, '\\u2029');

  return data;
}

module.exports = json;
