require('dotenv').config();
// const withTypescript = require('@zeit/next-typescript')
// var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = (phase, { defaultConfig }) => {
  return {
    // Will only be available on the server side
    serverRuntimeConfig: {},
    // Will be available on both server and client
    publicRuntimeConfig: {
      BASE_URL_FRONT: process.env.BASE_URL_FRONT,
      BASE_URL_SERVER: process.env.BASE_URL_SERVER,
      IMAGE_URL: process.env.IMAGE_URL,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, dir }) => {
      let alias = config.resolve.alias;
      alias['ssr'] = `${__dirname}`;
      alias['ssrSrc'] = `${__dirname}/src`;
      alias['actions'] = `${__dirname}/src/actions`;
      alias['common'] = `${__dirname}/src/common`;
      alias['components'] = `${__dirname}/src/components`;
      alias['config'] = `${__dirname}/src/config`;
      alias['constants'] = `${__dirname}/src/constants`;
      alias['context'] = `${__dirname}/src/context`;
      alias['hocs'] = `${__dirname}/src/hocs`;
      alias['hooks'] = `${__dirname}/src/hooks`;
      alias['interfaces'] = `${__dirname}/src/interfaces`;
      alias['models'] = `${__dirname}/src/models`;
      alias['reducers'] = `${__dirname}/src/reducers`;
      alias['services'] = `${__dirname}/src/services`;
      alias['stores'] = `${__dirname}/src/stores`;
      alias['themes'] = `${__dirname}/src/themes`;
      alias['translations'] = `${__dirname}/src/translations`;
      alias['ui'] = `${__dirname}/src/ui`;
      alias['utils'] = `${__dirname}/src/utils`;
      //console.log(alias);

      config.module.rules.push(        
        // .ts, .tsx
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          // loader: 'ts-loader',
        }
      );

      // config.plugins = [new DuplicatePackageCheckerPlugin({
      //   exclude(instance) {
      //     return instance.name === "styles.css";
      //   }
      // })];

      return config;
    },
  };
};
