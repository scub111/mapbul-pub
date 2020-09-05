const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// variables
const srcDir = 'src';
const sourcePath = path.join(__dirname, `./${srcDir}`);

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  // watch: true,
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ })],
    alias: {
      serverSrc: `${sourcePath}/`,
      api: `${sourcePath}/api`,
      common: `${sourcePath}/common`,
      interceptors: `${sourcePath}/interceptors`,
      interfaces: `${sourcePath}/interfaces`,
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
};