const path = require('node:path');
const fs = require('node:fs');

class WebManifest {
  data() {
    return {
      permalink: '/manifest.webmanifest',
      manifest: {
        display: 'minimal-ui',
        orientation: 'any',
        startUrl: '/'
      },
      eleventyExcludeFromCollections: true
    };
  }

  exists(uri) {
    return fs.existsSync(
      path.resolve('src', path.isAbsolute(uri) ? `./${uri}` : uri)
    );
  }

  stats(uri) {
    const extension = path.extname(uri).slice(1);
    const dimensions = uri.match(/(\d{2,3}x\d{2,3})/).shift();
    const maskable = uri.includes('maskable');

    return {
      src: uri,
      ...(extension && { type: `image/${extension}` }),
      ...(dimensions && { sizes: dimensions }),
      ...(maskable && { purpose: 'maskable' })
    };
  }

  render({ site, manifest }) {
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
        .filter((file) => this.exists(file))
        .map((file) => this.stats(file))
    });
  }
}

module.exports = WebManifest;
