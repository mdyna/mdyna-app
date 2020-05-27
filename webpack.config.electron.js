const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const webpackConfig = merge.smart(baseConfig, {
  output: {
    path: `${__dirname}/dist/web`,
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'" + process.env.NODE_ENV + "'",
      },
    }),
  ],
});

module.exports = webpackConfig;
