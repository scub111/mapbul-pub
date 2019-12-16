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
      alias['ssr'] = `${__dirname}`;
      alias['ssrSrc'] = `${__dirname}/src`;
      alias['common'] = `${__dirname}/src/common`;
      alias['components'] = `${__dirname}/src/components`;
      alias['interfaces'] = `${__dirname}/src/interfaces`;
      alias['services'] = `${__dirname}/src/services`;
      alias['utils'] = `${__dirname}/src/utils`;
      //console.log(alias);
      return config
    },
  };
};