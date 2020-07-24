const webpack = require('webpack');
const path = require('path');

// variables
const srcDir = 'src';
const buildDir = 'build';
// const isProduction = process.argv.mode === 'production' || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, `./${srcDir}`);
const outPath = path.join(__dirname, `./${buildDir}`);

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TimingCompilationPlugin = require('./TimingCompilationPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configProd = {
  app: [
    `${sourcePath}/app/index.tsx`
  ],
  appFilename: 'app-[contenthash].js',
  vendorFilename: 'vendor-[contenthash].js',
  devtool: '',
  cssUse: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: true,
      }
    },
    {
      loader: 'less-loader',
    },
  ],
  maxAssetSize: 2 * 1048576
}

const configDev = {
  app: [
    'react-dev-utils/webpackHotDevClient',
    `${sourcePath}/app/index.tsx`
  ],
  appFilename: 'app-debug.js',
  vendorFilename: 'vendor-debug.js',
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  cssUse: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
      }
    },
    {
      loader: 'less-loader',
      options: { sourceMap: true }
    },
  ],
  maxAssetSize: 10 * 1048576
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = argv.mode === 'none';
  console.log(`isProduction = ${isProduction} isAnalyze = ${isAnalyze}`);
  const config = !isProduction ? configDev : configProd;

  return {
    // context: sourcePath,
    entry: config.app,
    output: {
      filename: config.appFilename,
      path: outPath,
    },
    devtool: config.devtool,
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        src: `${sourcePath}/`,
        app: `${sourcePath}/app/`,
      }
    },
    module: {
      rules: [
        // .ts, .tsx
        {
          test: /\.(ts|tsx)$/,
          // loader: 'awesome-typescript-loader',
          loader: 'ts-loader',
        },
        // .css
        {
          test: /\.(css|less)$/,
          exclude: /node_modules/,
          use: config.cssUse
        },
      ]
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            filename: config.vendorFilename,
            priority: -10
          }
        }
      },
    },
    performance: {
      hints: "warning", // enum
      maxAssetSize: config.maxAssetSize, // int (in bytes),
      maxEntrypointSize: config.maxAssetSize, // int (in bytes)
      assetFilter: function (assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },
    plugins: (function () {
      const plugins = [];
      plugins.push(
        new HtmlWebpackPlugin({
          template: `./${srcDir}/index.html`,
          filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
          React: 'react',
          Promise: 'es6-promise' //add Promises for IE !!! 
        }),
        new TimingCompilationPlugin(),
      );
      if (isProduction) {
        //add some plugins that are only for production here
        plugins.push(
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin({
            filename: 'app-[contenthash].css',
          })
        )
      } else {
        if (isAnalyze) {
          plugins.push(
            new BundleAnalyzerPlugin()
          )
        }
      }
      return plugins;
    }()),
  }
};