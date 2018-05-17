import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import DotenvPlugin from 'webpack-dotenv-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import path from 'path';
import yargs from 'yargs'; // eslint-disable-line
import { loaders, loaderOptions } from './loaders.config';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';
const HOST = process.env.HOST || "0.0.0.0";
const PORT = yargs.argv.port || "3000";

export default {
  entry: {
    frontend: [
      dev ? 'react-hot-loader/patch' : null,
      './src/index.jsx',
    ].filter(Boolean),
  },
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: '/',
    filename: 'build/[name].js?[hash]',
  },
  resolve: {
    modules: [
      './node_modules/',
    ],
    extensions: [ '*', '.jsx', '.js', '.css' ],
    alias: {
      '_api': path.resolve(__dirname, 'src', 'api'),
      '_constants': path.resolve(__dirname, 'src', 'constants'),
      '_containers': path.resolve(__dirname, 'src', 'containers'),
      '_components': path.resolve(__dirname, 'src', 'components'),
      '_pages': path.resolve(__dirname, 'src', 'pages'),
    },
  },

  resolveLoader: {
    modules: ['./node_modules/'],
    moduleExtensions: [ '-loader', '*' ],
    extensions: [ '*', '.js' ],
  },

  devServer: {
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000,
    },
    hot: true, inline: true,
    historyApiFallback: {
      rewrites: [
        { from:/^\/admin/, to:'/admin/index.html' },
      ],
    },
    host: HOST, port: PORT,
  },

  module: {
    loaders,
  },

  devtool: NODE_ENV === 'production' ? false : 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Communities System',
      template: 'src/index.pug',
      filename: 'index.html',
      chunks: [ 'react-build', 'vendor', 'frontend' ],
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css?[hash]',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'build/vendor.js',
      minChunks(module, count) {
        const { context } = module;
        return context && context.indexOf('node_modules') >= 0 && count >= 2;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react-build',
      filename: 'build/react-build.js',
      minChunks(module) {
        const { context } = module;
        return context && context.indexOf('react') >= 0;
      },
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    new DotenvPlugin({
      sample: './_env',
      path: dev ? './.env' : './.env.prod',
      allowEmptyValues: true,
    }),

    loaderOptions,
    
    prod && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    dev && new WebpackErrorNotificationPlugin(),
    dev && new webpack.NoEmitOnErrorsPlugin(),
    dev && new BrowserSyncPlugin({
      host: 'local.bubujka.org',
      port: Number(PORT) + 2,
    }, {
      reload: false,
    }),
  ].filter(Boolean),
};
