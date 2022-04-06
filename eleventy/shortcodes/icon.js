const slug = require('../filters/slug.js');

/**
 * Embed icons from an external SVG document.
 *
 * @param {string} name The name of the icon to embed.
 * @param {object} [attributes] Additonal shortcode attributes.
 * @returns {string}
 */
function icon(name, attributes = {}) {
  const id = slug(name);

  const size = attributes.size ?? '24';
  const classes = attributes.class ?? ['icon', `icon--${id}`];

  return `
    <svg class="${classes.join(' ')}" width="${size}" height="${size}" focusable="false" aria-hidden="true">
      <use xlink:href="#icon-${id}"></use>
    </svg>
  `;
}

module.exports = icon;
