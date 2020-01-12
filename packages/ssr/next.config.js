require('dotenv').config();

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
      alias['constants'] = `${__dirname}/src/constants`;
      alias['interfaces'] = `${__dirname}/src/interfaces`;
      alias['models'] = `${__dirname}/src/models`;
      alias['services'] = `${__dirname}/src/services`;
      alias['stores'] = `${__dirname}/src/stores`;
      alias['themes'] = `${__dirname}/src/themes`;
      alias['utils'] = `${__dirname}/src/utils`;
      //console.log(alias);
      return config
    },
  };
};