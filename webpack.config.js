var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('style.css');
var isProduction = process.env.NODE_ENV === 'production';
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
        exclude: function( args ){
          return args.match(/node_modules/) && ( !args.match(/(preact|react-monaco-editor)/) );
        },
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
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      }
    ])
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'preact': path.resolve('./preact'),
      'react-monaco-editor': path.resolve('./react-monaco-editor')
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
