const get = require('lodash/get');

/**
 * Find all items in the collection whose property matches a given value. If no
 * value is given only items whose property evaluate to a true are returned.
 *
 * @param {object[]} collection The collection to iterate.
 * @param {string|string[]} key The name of the property to inspect.
 * @param {any} [value] The expected value.
 * @returns {object?}
 */
function where(collection, key, value) {
  return collection.filter((item) => {
    const element = get(item, key);

    if (value === undefined) {
      return element;
    }

    return value === element;
  });
}

module.exports = where;
