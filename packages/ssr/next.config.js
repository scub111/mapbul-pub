var path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['ssr'] = path.join(__dirname);
    console.log(config.resolve.alias);
    return config
  },
};


//require('dotenv').config();
// module.exports = {
//   // Will only be available on the server side
//   serverRuntimeConfig: {
//   },
//   // Will be available on both server and client
//   publicRuntimeConfig: {
//     BASE_URL: process.env.BASE_URL,
//   },
// };