/* eslint-disable import/no-extraneous-dependencies */
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'webpack-dotenv-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import yargs from 'yargs';
import path from 'path';
import fs from 'fs';

import { rules } from './loaders.config';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';

dotenv.config({
  path: [
    dev && path.join(__dirname, '.env.dev'),
    path.join(__dirname, '.env'),
  ].filter(Boolean).filter(fs.existsSync).shift(),
});

const dotenvPlugin = new DotenvPlugin({
  sample: './_env',
  path: [
    path.join(__dirname, '.env'),
    dev && path.join(__dirname, '.env.dev'),
  ].filter(Boolean),
  allowEmptyValues: true,
});


const PORT = yargs.argv.port || 3000;
const relativeBuildPath = './www';


module.exports = () => {
  const config = {
    src: './src',
  };

  return {
    entry: {
      frontend: `${config.src}/index.jsx`,
    },
    output: {
      path: path.join(__dirname, relativeBuildPath),
      publicPath: '/',
      filename: 'js/[name].js?[hash]',
    },

    resolve: {
      modules: [
        './node_modules/',
      ],
      extensions: [ '*', '.jsx', '.js', '.css' ],
      alias: {
        _constants: path.resolve(__dirname, 'src/constants'),
        _components: path.resolve(__dirname, 'src/components'),
        _pages: path.resolve(__dirname, 'src/pages'),
        _api: path.resolve(__dirname, 'src/api'),
      },
    },

    devServer: {
      port: PORT,
      host: 'local.bubujka.org',
      disableHostCheck: true,
      overlay: true,
      historyApiFallback: {
        rewrites: [
          { from:/^\//, to:'/index.html' },
        ],
      },
    },

    module: {
      rules,
    },
    devtool: NODE_ENV === 'production' ? false : 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Frontend',
        template: path.join(__dirname, ...config.src.replace('./', '').split('/'), 'index.html'),
        filename: 'index.html',
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css?[hash]',
        allChunks: true,
      }),
      new webpack.LoaderOptionsPlugin({
        debug: dev,
        minimize: prod,
        options: {
          stylus: {
            import: [
              '~stylus-mixins/index.styl',
              path.resolve(__dirname, './src/variables.styl'),
            ],
          },
        },
      }),

      dotenvPlugin,
      prod && new WebpackShellPlugin({
        onBuildStart: [`rimraf ${relativeBuildPath}`],
      }),
    ].filter(Boolean),
  };
};
