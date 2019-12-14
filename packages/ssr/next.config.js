require('dotenv').config(`${__dirname}/.--`)

module.exports = {
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
};