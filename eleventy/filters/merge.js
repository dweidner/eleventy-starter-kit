/**
 * Merge all enumerable properties from one or more source objects.
 *
 * @param {object} object The base object.
 * @param {...object} sources Additional objects to merge.
 * @returns {object}
 */
function merge(object, ...sources) {
  return Object.assign({}, object || {}, ...sources);
}

module.exports = merge;
