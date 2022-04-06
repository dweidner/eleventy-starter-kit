const postCSS = require('postcss');
const loadConfig = require('postcss-load-config');

/**
 * Transpile the given stylesheet.
 *
 * @param {string} content The content of the stylesheet.
 * @param {string} inputPath The input path.
 * @param {string} outputPath The output path.
 * @param {object} [config] Additional configuration for the processor.
 * @returns {Promise<string>}
 */
async function transpile(content, inputPath, outputPath, config = {}) {
  const processor = postCSS(config.plugins || []);
  const output = await processor.process(content, {
    from: inputPath,
    to: outputPath,
    map: config.options?.map
  });

  const warnings = output.warnings();
  const styles = output.toString();

  if (warnings.length > 0) {
    console.warn('postcss: %o\n%o', inputPath, warnings);
  }

  return styles;
}

module.exports = {
  outputFileExtension: 'css',
  async init() {
    this.config.postcss = await loadConfig({
      file: 'postcss.config.js'
    });
  },
  async compile(inputContent) {
    return async(data) => {
      const { inputPath, outputPath } = data.page;

      return transpile(
        inputContent,
        inputPath,
        outputPath,
        this.config.postcss || {}
      );
    };
  }
};
