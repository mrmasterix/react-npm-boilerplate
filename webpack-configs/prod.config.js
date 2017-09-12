const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config.json');

module.exports = {

  entry: {
    index: [path.resolve(__dirname, '../src/index.js')],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    libraryTarget: 'umd',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?name=./img/[name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules|bower_components|vender_modules)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-3'],
              plugins: [
                'transform-runtime',
                'transform-decorators-legacy',
              ],
              sourceMaps: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [

    new ExtractTextPlugin({
      filename: './component.css',
      disable: false,
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      envConfig: JSON.stringify(config.production),
      commonConfig: JSON.stringify(config.common),
    }),

  ],
};
