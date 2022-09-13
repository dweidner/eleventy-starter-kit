/**
 * Returns the fully qualified path to an asset file.
 *
 * @param {string} uri The URI to convert.
 * @returns {string}
 */
function assetPath(uri) {
  const base = this.ctx?.vite?.assetsDir ?? 'assets';
  const path = uri.trimStart('/');

  return `/${base}/${path}`;
}

module.exports = assetPath;
