'use strict';
const dotenv = require('dotenv');
const path = require('path');

function getClientEnvironment(isProduction) {
  const filePath = isProduction ? path.join(__dirname, '.env.prod') : path.join(__dirname, '.env.dev');
  const fileEnv = dotenv.config({ path: filePath }).parsed;
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return envKeys;
}

module.exports = getClientEnvironment;
