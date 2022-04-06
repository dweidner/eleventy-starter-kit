const htmlmin = require('html-minifier');

/**
 * Indicates whether a production build is currently running.
 *
 * @member {boolean}
 */
const isProduction = (process.env.NODE_ENV === 'production');

/**
 * Determine whether a given file should be minified.
 *
 * @param {string} file The file to inspect.
 * @returns {boolean}
 */
function shouldMinify(file) {
  return (
    isProduction &&
    file &&
    file.endsWith('.html')
  );
}

/**
 * Minify HTML files.
 *
 * @param {string} content The file content.
 * @returns {string}
 */
function minifyHTML(content) {
  if (shouldMinify(this.outputPath)) {
    return htmlmin.minify(content, {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      html5: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      processScripts: [
        'application/json',
        'application/ld+json'
      ]
    });
  }

  return content;
}

module.exports = minifyHTML;
