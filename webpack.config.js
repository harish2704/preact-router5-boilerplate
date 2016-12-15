var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('style.css');
var isProduction = process.env.NODE_ENV === 'production';

function getCssLoader( loader ){
  if( isProduction ){
    loader = loader.split('!');
    return extractCSS.extract( loader[0], loader.slice(1).join('!') );
  }
  return loader;
}

var config = {
  entry: "./core/entry.js",
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
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
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }, 
    extensions: ['', '.js', '.jsx']
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
      sourceMap: false,
      output: {
        comments: false,
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
      },
    })
  ]);
}

module.exports = config;
