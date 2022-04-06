const get = require('lodash/get');
const map = require('lodash/map');

/**
 * Lookup a property on each item of the given collection.
 *
 * @param {object[]} collection The collection to iterate.
 * @param {string|string[]} key The property to extract.
 * @param {any} [defaultValue=null] The default value to return if the property does not exist.
 * @returns {Array}
 */
function pluck(collection, key, defaultValue = null) {
  return map(collection, (item) => get(item, key, defaultValue));
}

module.exports = pluck;
