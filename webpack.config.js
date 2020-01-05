const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || '8080';
module.exports = {
  mode: process.env.NODE_ENV === 'PROD' ? 'production' : 'development',
  entry: ['./app/index.js', './app/style.scss', '@babel/polyfill'],
  output: {
    filename: 'index.js',
    publicPath:
      process.env.NODE_ENV === 'PROD'
        ? './'
        : `http://localhost:${port}/dist/web`,
    path: path.resolve(__dirname, 'dist', 'web'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Components: path.resolve(__dirname, 'app/components'),
      Containers: path.resolve(__dirname, 'app/containers'),
      UI: path.resolve(__dirname, 'app/components/UI'),
      Store: path.resolve(__dirname, 'app/store'),
      Utils: path.resolve(__dirname, 'app/utils'),
      Assets: path.resolve(__dirname, 'app/assets'),
    },
  },
  devtool: 'source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
        ],
      },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
    }),
  ],
  stats: {
    colors: true,
  },
};
