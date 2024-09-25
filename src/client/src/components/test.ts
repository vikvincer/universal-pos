module.exports = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      skipAudits: ['byte-efficiency/uses-responsive-images', 'byte-efficiency/uses-webp-images', 'seo/meta-description'],
      scores: {
        performance: 90,
        accessibility: 90,
        'best-practices': 90,
        seo: 80,
      },
    },
    ci: {
      collect: {
        staticDistDir: './dist',
        url: ['http://localhost:42000'],
        startCommand: 'npm run start',
        startServerReadyTimeout: 60000,
        settings: {
          chromeFlags: ['--disable-web-security']
        }
      },
      upload: {
        target: 'lhci',
        serverBaseUrl: 'https://your-lhci-server.com',
      },
    },
  };
  