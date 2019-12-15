var path = require('path');
const withPlugins = require('next-compose-plugins');

// module.exports = withPlugins([{
//   // Will only be available on the server side
//   serverRuntimeConfig: {
//   },
//   // Will be available on both server and client
//   publicRuntimeConfig: {
//     BASE_URL: process.env.BASE_URL,
//   },
// }], {
//   webpack(config, options) {
//     config.resolve.alias['ssr'] = path.join(__dirname);
//     console.log(config.resolve.alias);
//     return config
//   },
// });


// module.exports = (phase, { defaultConfig }) => {
//   return {
//     publicRuntimeConfig: {
//       BASE_URL: process.env.BASE_URL,
//     },
//     webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//       config.resolve.alias['ssr'] = path.join(__dirname);
//       console.log(config.resolve.alias);
//       return config
//     },
//   };
// };

require('dotenv').config();
module.exports = {
  // Will only be available on the server side
  serverRuntimeConfig: {
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias['ssr'] = path.join(__dirname);
    console.log(config.resolve.alias);
    return config
  }
};