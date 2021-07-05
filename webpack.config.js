'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js')
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  output: {
    path: __dirname + '/js',
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader?modules'
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
   plugins: [
    /* new webpack.LoaderOptionsPlugin({
      options: {
          customInterpolateName: (loaderContext) => {
              return loaderContext.replace('<%s', '<s');
          }
      }
  }),*/ 
   new webpack.optimize.UglifyJsPlugin({
    comments: false, // remove comments
    compress: {
      unused: true,
      dead_code: true, // big one--strip code that will never execute
      warnings: false, // good for prod apps so users can't peek behind curtain
      drop_debugger: true,
      conditionals: true,
      evaluate: true,
      drop_console: true, // strips console statements
      sequences: true,
      booleans: true,
    }
  }) 
  ],  
};
