const fs = require('node:fs/promises');
const path = require('node:path');

const rollup = require('rollup');
const loadConfigFile = require('rollup/dist/loadConfigFile.js');

/**
 * Normalize a file path.
 *
 * @param {string} input The file path to normalize.
 * @returns {string}
 */
function normalizePath(input) {
  if (
    (input === '.') ||
    (input === '..')
  ) {
    return input + path.sep;
  }

  if (
    path.isAbsolute(input) ||
    input.startsWith(`.${path.sep}`) ||
    input.startsWith(`..${path.sep}`)
  ) {
    return input;
  }

  return `.${path.sep}${input}`;
}

/**
 * Combine the content of multiple chunks into a single string.
 *
 * @param {object[]} chunks A collection of chunks.
 * @returns {string}
 */
function mergeChunks(chunks) {
  return chunks
    .map((chunk) => chunk.code)
    .join('');
}

/**
 * Load the rollup configuration.
 *
 * @param {string} [file='rollup.config.js'] The path of the configuration file.
 * @returns {Promise<object>}
 */
async function loadConfig(file = 'rollup.config.js') {
  const { options } = await loadConfigFile(path.resolve(file));

  const store = {};

  for (const { input, watch, ...config } of options) {
    for (const entryPoint of Object.values(input)) {
      store[normalizePath(entryPoint)] = config;
    }
  }

  return store;
}

/**
 * Write a given bundle output to the file system.
 *
 * @param {object} file The output file to write.
 * @returns {Promise<string>}
 */
async function writeOutputFile(file) {
  const fileName = path.resolve('dist', file.fileName);
  const fileContent = (file.type === 'asset') ? file.source : file.code;

  await fs.mkdir(path.dirname(fileName), { recursive: true });
  await fs.writeFile(fileName, fileContent);

  return fileContent;
}

/**
 * Generate the bundle for a given entry point.
 *
 * @param {string} inputPath The path of the entry point.
 * @param {object} inputOptions The configuration of the bundle.
 * @returns {Promise<string>}
 */
async function generateBundle(inputPath, inputOptions) {
  const outputOptions = inputOptions.output || [];

  if (outputOptions.length === 0) {
    throw new Error(`Output options missing for ${inputPath}`);
  }

  const bundle = await rollup.rollup({ ...inputOptions, input: inputPath });

  const entryPoints = [];
  const assets = [];
  const chunks = [];

  for (const options of outputOptions) {
    const { output } = await bundle.generate(options);

    for (const file of output) {
      if ((file.type === 'asset')) {
        assets.push(file);
      } else if (file.isEntry) {
        entryPoints.push(file);
      } else {
        chunks.push(file);
      }
    }
  }

  await Promise.all(assets.map((file) => writeOutputFile(file)));
  await Promise.all(chunks.map((file) => writeOutputFile(file)));

  await bundle.close();

  return mergeChunks(entryPoints);
}

module.exports = {
  outputFileExtension: 'js',
  read: false,
  async init() {
    this.config.rollup = await loadConfig();
  },
  async compile(inputContent, inputPath) {
    if (inputPath in this.config.rollup) {
      return () => generateBundle(inputPath, this.config.rollup[inputPath]);
    }
  }
};
