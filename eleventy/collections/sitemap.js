/**
 * Get all pages that should be included in the sitemap.
 *
 * @typedef {import('@11ty/eleventy/src/TemplateCollection')} TemplateCollection
 * @param {TemplateCollection} collection The template collection.
 * @returns {object[]}
 */
function getSitemapEntries(collection) {
  return collection
    .getAll()
    .filter((item) => (
      Boolean(item.url) &&
      Boolean(item.data.sitemap)
    ));
}

module.exports = getSitemapEntries;
