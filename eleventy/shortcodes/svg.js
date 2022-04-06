const fs = require('node:fs/promises');
const path = require('node:path');

/**
 * Add an XML attribute to the given SVG element. Replaces already existing
 * attributes.
 *
 * @param {string} content The SVG markup.
 * @param {string} attributeName The name of the attribute to inject.
 * @param {any} attributeValue The value of teh attribute to inject.
 * @returns {string}
 */
function injectSVGAttribute(content, attributeName, attributeValue) {
  const regex = new RegExp(`(<svg[^>]*)(\\s+${attributeName}="[^"]+")([^>]*>)`);

  const attribute = ` ${attributeName}="${attributeValue}"`;
  const matches = regex.exec(content);

  if (!matches) {
    return content.replace(/(<svg[^>]*)(>)/, `$1${attribute}$2`);
  }

  const offset = matches.index + matches[1].length;

  const prefix = content.slice(0, offset);
  const suffix = content.slice(offset + matches[2].length);

  return prefix + attribute + suffix;
}

/**
 * Remove an XML attribute from the given SVG element.
 *
 * @param {string} content The SVG markup.
 * @param {string} attributeName The name of the attribute to inject.
 * @returns {string}
 */
function removeSVGAtribute(content, attributeName) {
  return content.replace(new RegExp(`(<svg[^>]*)(\\s+${attributeName}="[^"]+")([^>]*>)`), '$1$3');
}

/**
 * Embed a SVG document.
 *
 * @param {string} source The path to the SVG document.
 * @param {object} attributes Additional XML attributes to add to the element.
 * @returns {Promise<string>}
 */
async function svg(source, attributes = {}) {
  let content = await fs.readFile(path.join('src', source), { encoding: 'utf8' });

  // NOTE: Consider replacing the RegExp based solution with an XML parser like JSDOM.
  content = removeSVGAtribute(content, 'xmlns');
  content = removeSVGAtribute(content, 'xmlns:xlink');

  for (const [key, value] of Object.entries(attributes)) {
    if (!key.startsWith('__')) {
      content = injectSVGAttribute(content, key, value);
    }
  }

  return content;
}

module.exports = svg;
