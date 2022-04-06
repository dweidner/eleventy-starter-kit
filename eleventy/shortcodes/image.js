const Image = require('@11ty/eleventy-img');
const path = require('node:path');

/**
 * A map of image presets.
 *
 * @type {Object<string, object>}
 */
const ImagePresets = {
  hero: {
    widths: [
      1920,
      1680,
      1280,
      768,
      380
    ],
    sizes: [
      '100vw'
    ]
  }
};

/**
 * Generate a picture element that reference multiple size variations of an
 * image.
 *
 * @param {string} source Relative path to the source image to process.
 * @param {object} [options={}] Additional shortcode options.
 * @param {string|string[]} [options.classes='image'] The classes to add to the image element.
 * @param {string} [options.loading='lazy'] The loading strategy.
 * @param {string} [options.alt=''] The alternative text of the image.
 * @param {string} [options.preset=''] The name of the image preset to use.
 * @returns {string}
 */
function imageShortcode(source, options = {}) {
  const {
    classes = 'image',
    loading = 'lazy',
    alt = '',
    preset = null
  } = options;

  const {
    formats = ['webp', 'jpeg'],
    widths = [1920],
    sizes = ['100vw'],
    quality = 80
  } = ImagePresets[preset] ?? {};

  const fileName = path.join('src', source);
  const fileDirectory = path.relative('src', path.dirname(fileName));

  const imageOptions = {
    widths,
    formats,
    urlPath: `/${fileDirectory}/`,
    outputDir: path.join('dist', fileDirectory),
    sharpPngOptions: {
      quality,
      progressive: true
    },
    sharpJpegOptions: {
      quality,
      mozjpeg: true,
      progressive: true
    },
    sharpWebpOptions: {
      quality
    },
    filenameFormat(id, source_, width, format) {
      const extension = path.extname(source_);
      const name = path.basename(source_, extension);

      return `${name}-${width}w.${format}`;
    }
  };

  // Generate the image asynchronously to avoid problems in Nunjuck templates.
  Image(fileName, imageOptions);

  const metadata = Image.statsSync(fileName, imageOptions);

  const attributes = {
    class: Array.isArray(classes) ? classes.join(' ') : classes,
    alt,
    sizes: sizes.join(', '),
    loading,
    decoding: (loading === 'lazy' ? 'async' : 'sync')
  };

  return Image.generateHTML(metadata, attributes);
}

module.exports = imageShortcode;
