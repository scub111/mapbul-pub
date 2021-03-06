const webpack = require('webpack');
const path = require('path');

// variables
const srcDir = 'src';
// const buildDir = 'build/12';
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

// functions
const getClientEnvironment = require('./env');

const configProd = {
  app: [
    `${sourcePath}/index.tsx`
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
  maxAssetSize: 3 * 1048576
}

const configDev = {
  app: [
    'react-dev-utils/webpackHotDevClient',
    `${sourcePath}/index.tsx`
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
  maxAssetSize: 20 * 1048576
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
      // publicPath: '/12/',
      publicPath: '/',
    },
    devtool: config.devtool,
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        src: `${sourcePath}/`,
        actions: `${sourcePath}/actions`,
        components: `${sourcePath}/components`,
        constants: `${sourcePath}/constants`,
        hocs: `${sourcePath}/hocs`,
        containers: `${sourcePath}/containers`,
        hooks: `${sourcePath}/hooks`,
        interfaces: `${sourcePath}/interfaces`,
        middleware: `${sourcePath}/middleware`,
        models: `${sourcePath}/models`,
        pages: `${sourcePath}/pages`,
        reducers: `${sourcePath}/reducers`,
        sagas: `${sourcePath}/sagas`,
        services: `${sourcePath}/services`,
        store: `${sourcePath}/store`,
        types: `${sourcePath}/types`,
        ui: `${sourcePath}/ui`,
        utils: `${sourcePath}/utils`,
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
    devServer: {
      // historyApiFallback: true,
      host: '0.0.0.0'
    },
    plugins: (function () {
      const plugins = [];
      plugins.push(
        new HtmlWebpackPlugin({
          template: `./${srcDir}/index.html`,
          filename: 'index.html',
          // meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
        }),
        new webpack.ProvidePlugin({
          React: 'react',
          Promise: 'es6-promise' //add Promises for IE !!! 
        }),
        new TimingCompilationPlugin(),
        new webpack.DefinePlugin(getClientEnvironment(isProduction)),
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