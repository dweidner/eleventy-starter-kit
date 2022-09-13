/**
 * Returns the fully qualified path to a static file.
 *
 * @param {string} uri The URI to convert.
 * @returns {string}
 */
function publicPath(uri) {
  const base = this.ctx?.vite?.publicDir ?? 'public';
  const path = uri.trimStart('/');

  return `/${base}/${path}`;
}

module.exports = publicPath;
