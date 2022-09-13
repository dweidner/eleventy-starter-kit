const { DateTime } = require('luxon');

/**
 * Convert a date to ISO 8601 format (e.g. 2016-09-30T12:00:00.000+01:00).
 *
 * @param {string|Date} value The date to format.
 * @returns {string}
 */
function iso8601(value) {
  const dateTime = (value instanceof Date)
    ? DateTime.fromJSDate(value)
    : DateTime.fromISO(value);

  return dateTime
    .set({
      seconds: 0,
      milliseconds: 0,
    })
    .toISO({
      suppressSeconds: true,
      suppressMilliseconds: true,
    });
}

module.exports = iso8601;
