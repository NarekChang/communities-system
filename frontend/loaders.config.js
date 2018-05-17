import { readFileSync } from 'fs';
/* eslint-disable import/no-extraneous-dependencies */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import md5 from 'js-md5';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' :
  'development';

const CSSLOADER = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 2,
    camelCase: true,
    localIdentName: '[name]__[local]___[hash:base64:5][folder][path]',
    getLocalIdent: (context, localIdentName, localName) => {
      const rp = context.resourcePath.replace(process.cwd(), '');
      const hsh = Buffer.from(md5(rp)).toString('base64').substr(1, 5);
      return `${localName}___${hsh}`;
    },
  },
};
const CSSLOADER_NOMODULES = {
  ...CSSLOADER,
  options: {
    ...CSSLOADER.options,
    modules: false,
  },
};
const ICONFONTLOADER = {
  loader: 'webfonts-loader',
  options: {
    fileName: "assets/[hash].[ext]",
  },
};
const IMAGESLOADERS = [{
  loader: 'file-loader',
  options: {
    name: 'assets/[hash].[ext]',
  },
}];
if (NODE_ENV === "production") IMAGESLOADERS.push('image-optimize-loader');

const Styles = [
  'css-modules-flow-types-loader',
  CSSLOADER,
  'postcss-loader', {
    loader: 'stylus-loader',
    options: {
      outputStyle: 'expanded',
    },
  },
];

const ASSETSFIXLOADER = {
  loader: "string-replace",
  options: {
    search: '/assets',
    replace: NODE_ENV === "production" ? '../assets' : 'http://local.bubujka.org:3000/assets',
    flags: 'g',
  },
};

export const loaders = [{
  test: /\.jsx$/,
  include: [ path.join(__dirname, 'src') ],
  exclude: /(node_modules\/)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        "es2015",
        "react"
      ],
      plugins: [
        "transform-object-rest-spread"
      ]
    },
  },
}, {
  test: /\.json$/,
  loader: 'json',
}, {
  test: /\.html$/,
  loader: 'html?attrs=img:src link:href xlink:href source:src image:xlink:href&interpolate',
}, {
  test: /\.(pug|jade)$/,
  loaders: [
    'html?attrs=img:src link:href xlink:href source:src image:xlink:href&interpolate',
    `pug-html?exports=false&basedir=${path.resolve(__dirname)}`,
  ],
}, {
  test: /\.styl$/,
  loaders: NODE_ENV === 'production' ?
    ExtractTextPlugin.extract({ fallback:'style', use:Styles, publicPath:'../' }) : [
      'style-loader',
    ].concat(Styles),
}, {
  test: /\.css$/,
  exclude: /\/(node_modules|bower_components)\//,
  loaders: NODE_ENV === 'production' ?
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ CSSLOADER, 'postcss-loader' ],
    }) : [ 'style', CSSLOADER, 'postcss' ],
}, {
  test: /\.css$/,
  include: /\/(node_modules|bower_components)\//,
  loaders: NODE_ENV === 'production' ?
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ CSSLOADER_NOMODULES, 'postcss-loader' ],
    }) : [ 'style', CSSLOADER_NOMODULES, 'postcss' ],
}, {
  test: /\.jsfont$/,
  loaders: NODE_ENV === 'production' ?
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ ASSETSFIXLOADER, 'css-loader?sourceMap', ICONFONTLOADER ],
    }) : [ 'style-loader', ASSETSFIXLOADER, 'css-loader?sourceMap', ICONFONTLOADER ],
}, {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: IMAGESLOADERS,
}, {
  test: /\.(ttf|otf|eot|woff|woff2|webm|ogv|mp4)$/,
  loader: {
    loader: 'file-loader',
    options: {
      name: 'assets/[hash].[ext]',
    },
  },
}];

export const loaderOptions = new webpack.LoaderOptionsPlugin({
  debug: NODE_ENV !== 'production',
  minimize: NODE_ENV === 'production',
  options: {
    // context: __dirname,
    stylus: {
      import: [
        '~stylus-mixins/index.styl',
        path.resolve(__dirname, './src/_bir.styl'),
      ],
    },
    postcss: [
      autoprefixer({
        browsers: ['last 3 version'],
      }),
    ],
    imageOptimizeLoader: {
      optimizer: {
        covertPngToJpg: true,
      },
      pngquant: {
        quality: '65-80',
        speed: 4,
        verbose: true,
      },
      mozjpeg: {
        targa: false,
      },
      svgo: {
        plugins: [
          { removeComments:true },
          { sortAttrs:true },
          { minifyStyles:true },
        ],
      },
    },
  },
});
