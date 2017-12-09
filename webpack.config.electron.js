const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const webpackConfig = merge.smart(baseConfig, {
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"electron"',
      },
    }),
  ],
  target: 'electron',
});

module.exports = webpackConfig;
