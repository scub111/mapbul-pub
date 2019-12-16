require('dotenv').config();
var path = require('path');

module.exports = (phase, { defaultConfig }) => {
  return {
    // Will only be available on the server side
    serverRuntimeConfig: {
    },
    // Will be available on both server and client
    publicRuntimeConfig: {
      BASE_URL: process.env.BASE_URL,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      let alias = config.resolve.alias;
      alias['ssr'] = path.join(__dirname);
      alias['ssrSrc'] = path.join(__dirname, 'src');
      return config
    },
  };
};