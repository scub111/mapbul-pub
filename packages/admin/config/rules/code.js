const paths = require('../paths');

module.exports = () => [
  {
    test: /\.(ts|tsx)$/,
    // loader: 'awesome-typescript-loader',
    loader: 'ts-loader',
    exclude: /node_modules/
  },
];
