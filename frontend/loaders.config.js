/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 2,
    camelCase: true,
    localIdentName: '[name]__[local][emoji:4]___[hash:base64:5][folder][path]',
  },
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer({
        browsers: ['last 3 version'],
      }),
    ],
    sourceMap: dev,
  },
};

const stylusLoader = {
  loader: 'stylus-loader',
};

const imagesLoader = {
  loader: 'file-loader',
  options: {
    name: 'assets/[hash].[ext]',
  },
};

module.exports = {
  rules: [{
    test: /\.css$/,
    exclude: /\/(node_modules)\//,
    use: prod ?
      ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader],
      }) : [ 'style-loader', cssLoader ],
  }, {
    test: /\.css$/,
    include: /\/(node_modules)\//,
    use: prod ?
      ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader],
      }) : [ 'style-loader', cssLoader ],
  }, {
    test: /\.styl$/,
    exclude: /\/(node_modules)\//,
    use: prod ?
      ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ cssLoader, postcssLoader, stylusLoader ],
      }) : [ 'style-loader', cssLoader, postcssLoader, stylusLoader ],
  }, {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: imagesLoader,
  }, {
    test: /\.(ttf|eot|woff|woff2|webm|ogv|mp4)$/,
    loaders: imagesLoader,
  },
  {
    test: /\.jsx?$/,
    include: [path.join(__dirname, 'src')],
    exclude: /(node_modules\/)/,
    use: {
      loader: 'babel-loader',
    },
  }],
};
