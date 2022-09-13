const EleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');

const {config} = require('dotenv');
const {sortBy} = require('lodash');
const {format} = require('util');

/**
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventy
 */
module.exports = function (eleventy) {
  // Environment variables
  config();

  // Plugins
  eleventy.addPlugin(EleventyNavigationPlugin);
  eleventy.addPlugin(EleventyVitePlugin, {
    tempFolderName: 'node_modules/.11ty-vite',
    viteOptions: {
      appType: 'custom',
      cacheDir: 'node_modules/.vite',
      publicDir: process.env.VITE_PUBLIC_DIRECTORY || 'public',
      envDir: '..',
      envPrefix: 'APP_',
      logLevel: 'warn',
      build: {
        assetsDir: process.env.VITE_ASSETS_DIRECTORY || 'assets',
        assetsInlineLimit: 0,
      },
    },
  });

  // Passthrough Copies
  eleventy.addPassthroughCopy('src/assets/fonts');
  eleventy.addPassthroughCopy('src/assets/styles');
  eleventy.addPassthroughCopy('src/assets/scripts');
  eleventy.addPassthroughCopy('src/assets/static');

  // Server Configuration
  eleventy.setServerPassthroughCopyBehavior('copy');

  // Layouts
  eleventy.addLayoutAlias('base', 'base.njk');
  eleventy.addLayoutAlias('post', 'post.njk');
  eleventy.addLayoutAlias('page', 'page.njk');

  // Collections
  eleventy.addCollection('sitemap', require('./eleventy/collections/sitemap'));

  // Filters
  eleventy.addFilter('format', format);
  eleventy.addFilter('sort_by', sortBy);

  eleventy.addFilter('absolute_url', require('./eleventy/filters/absolute-url'));
  eleventy.addFilter('append', require('./eleventy/filters/append'));
  eleventy.addFilter('asset_path', require('./eleventy/filters/asset-path'));
  eleventy.addFilter('at_least', require('./eleventy/filters/at-least'));
  eleventy.addFilter('at_most', require('./eleventy/filters/at-most'));
  eleventy.addFilter('date', require('./eleventy/filters/date'));
  eleventy.addFilter('dump', require('./eleventy/filters/dump'));
  eleventy.addFilter('excerpt', require('./eleventy/filters/excerpt'));
  eleventy.addFilter('iso8601', require('./eleventy/filters/iso8601'));
  eleventy.addFilter('json_attribute', require('./eleventy/filters/json-attribute'));
  eleventy.addFilter('json', require('./eleventy/filters/json'));
  eleventy.addFilter('merge', require('./eleventy/filters/merge'));
  eleventy.addFilter('obfuscate', require('./eleventy/filters/obfuscate'));
  eleventy.addFilter('pluck', require('./eleventy/filters/pluck'));
  eleventy.addFilter('prepend', require('./eleventy/filters/prepend'));
  eleventy.addFilter('public_path', require('./eleventy/filters/public-path'));
  eleventy.addFilter('skip', require('./eleventy/filters/skip'));
  eleventy.addFilter('slug', require('./eleventy/filters/slug'));
  eleventy.addFilter('take', require('./eleventy/filters/take'));
  eleventy.addFilter('tel', require('./eleventy/filters/tel'));
  eleventy.addFilter('where', require('./eleventy/filters/where'));

  // Shortcodes
  eleventy.addAsyncShortcode('svg', require('./eleventy/shortcodes/svg'));
  eleventy.addShortcode('icon', require('./eleventy/shortcodes/icon'));
  eleventy.addShortcode('image', require('./eleventy/shortcodes/image'));

  // Transforms
  eleventy.addTransform('minify-html', require('./eleventy/transforms/minify-html'));

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: [
      'njk',
      'md',
      '11ty.js',
    ],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
