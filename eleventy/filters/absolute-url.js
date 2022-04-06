/**
 * Convert a relative to an absolute URL.
 *
 * @param {string} uri The URL to convert.
 * @param {string} [base=null] The base URL to use in cases where url is a relative URL.
 * @returns {string}
 */
function absoluteUrl(uri, base = null) {
  base = base ?? this.ctx?.site?.url;

  try {
    return (new URL(uri, base)).toString();
  } catch {
    console.warn('Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)', uri, base, uri);
    return uri;
  }
}

module.exports = absoluteUrl;
