var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('style.css');
var isProduction = process.env.NODE_ENV === 'production';
var path = require('path');

function getCssLoader( loader ){
  if( isProduction ){
    loader = loader.split('!');
    return extractCSS.extract( loader[0], loader.slice(1).join('!') );
  }
  return loader;
}

var config = {
  entry: [
    './core/entry.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: getCssLoader('style!css')
      },
      {
        test: /\.scss$/,
        loader: getCssLoader('style!css!sass')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file'
      }
    ],
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // 'preact': path.resolve('./preact'),
    },
    extensions: ['', '.js', '.ts', '.tsx' ]
  },
  devtool: 'source-map',
  devServer: {
    port: 8002,
    historyApiFallback: {
      index: 'core/test.html'
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
      },
    })
  ]);
} else {
  config.entry.push('preact/devtools');
}

module.exports = config;
