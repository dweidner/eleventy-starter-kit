const path = require('node:path');
const fs = require('node:fs');

class WebManifest {
  data() {
    return {
      permalink: ({ vite }) => (
        `/${vite.publicDir}/manifest.webmanifest`
      ),
      manifest: {
        display: 'minimal-ui',
        orientation: 'any',
        startUrl: '/',
      },
      eleventyExcludeFromCollections: true,
    };
  }

  stats(uri) {
    const extension = path.extname(uri).slice(1);
    const dimensions = uri.match(/(\d{2,3}x\d{2,3})/).shift();
    const maskable = uri.includes('maskable');

    return {
      src: uri,
      ...(extension && { type: `image/${extension}` }),
      ...(dimensions && { sizes: dimensions }),
      ...(maskable && { purpose: 'maskable' }),
    };
  }

  render({ site, vite, manifest }) {
    return JSON.stringify({
      name: site.name,
      short_name: site.shortName,
      description: site.description,
      lang: site.language,
      display: manifest.display,
      orientation: manifest.orientation,
      start_url: manifest.startUrl,
      theme_color: site.themeColor,
      background_color: site.backgroundColor,
      icons: site.icons
        .map((file) => (
          path.isAbsolute(file)
            ? path.resolve('src', vite.publicDir, file)
            : path.resolve('src', file)
        ))
        .filter((file) => fs.existsSync(file))
        .map((file) => this.stats(file)),
    });
  }
}

module.exports = WebManifest;
