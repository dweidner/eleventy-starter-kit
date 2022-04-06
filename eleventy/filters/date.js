const { DateTime } = require('luxon');

/**
 * Convert a date to a string representation formatted according to the
 * specified format string.
 *
 * @param {string|Date} value The date to format.
 * @param {string | object} [format="DDD"] The desired date format.
 * @param {string} [locale=null] The locale to use.
 * @returns {string}
 */
function date(value, format = DateTime.DATE_FULL, locale = null) {
  locale = locale || this.ctx?.site?.locale?.replace('_', '-');

  const dateTime = (value instanceof Date)
    ? DateTime.fromJSDate(value)
    : DateTime.fromISO(value);

  return (typeof format === 'string')
    ? dateTime.setLocale(locale).toFormat(format)
    : dateTime.setLocale(locale).toLocaleString(format);
}

module.exports = date;
