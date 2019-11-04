const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: "node",
  // node: {
  //   dotenv: 'empty',
  // },
  mode: 'production',
  externals: [
    nodeExternals(),
  ],
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Common',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ })]
  },
  // devtool: 'source-map',
  optimization: {
    minimize: true
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
}
