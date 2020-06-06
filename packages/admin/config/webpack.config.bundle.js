const webpack = require('webpack');
const path = require('path');
const getClientEnvironment = require('./env');
const lib = require('../package.json');

// variables
const srcDir = 'src';
const sourcePath = path.join(__dirname, '..', `./${srcDir}`);
const publicUrl = '';
const env = getClientEnvironment(publicUrl);
const TerserPlugin = require('terser-webpack-plugin');
const maxAssetSize = 10 * 1048576;

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// rules
const codeRules = require('./rules/code');
const styleRules = require('./rules/styles');
const otherRules = require('./rules/other');

module.exports = {
  entry: `${sourcePath}/index.tsx`,
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '..', './build'),
    library: lib.name,
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react-router': 'react-router',
    'styled-components': 'styled-components',
  },
  resolve: {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.styl',
      '.css',
      'scss',
    ],
    alias: {
      src: `${sourcePath}/`,
      components: `${sourcePath}/components`,
      assets: `${sourcePath}/assets`,
      interfaces: `${sourcePath}/interfaces`,
      constants: `${sourcePath}/constants`,
      contexts: `${sourcePath}/contexts`,
      models: `${sourcePath}/models`,
      modalPages: `${sourcePath}/modalPages`,
      pages: `${sourcePath}/pages`,
      stores: `${sourcePath}/stores`,
      services: `${sourcePath}/services`,
      themes: `${sourcePath}/themes`,
      ui: `${sourcePath}/ui`,
      utils: `${sourcePath}/utils`,
    },
  },
  module: {
    rules: [...codeRules(), ...styleRules(), ...otherRules()],
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          priority: -10,
        },
      },
    },
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: maxAssetSize, // int (in bytes),
    maxEntrypointSize: maxAssetSize, // int (in bytes)
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(env.stringified),
  ],
};
