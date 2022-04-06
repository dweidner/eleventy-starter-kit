const { inspect } = require('node:util');

/**
 * Returns a string representation of the given object. This filter can be used
 * to introspect template variables.
 *
 * @param {...any} args The object to inspect.
 * @returns {string}
 */
function dump(...args) {
  return inspect(args.length > 1 ? args : args[0]);
}

module.exports = dump;
