module.exports = function(config) {
  config.set({
    // ... otras configuraciones ...
    
    browsers: ['ChromeWSL'],
    
    customLaunchers: {
      ChromeWSL: {
        base: 'Chrome',
        flags: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--remote-debugging-port=9222'
        ]
      }
    },
    
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    captureTimeout: 210000
  });
};