// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
});

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  
  // console.log(`The environment variable I received is, ${env}`)
  return {
    context: path.join(__dirname, '/public/js/'),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.resolve(__dirname, 'public/js'), // used to be dist
      filename: '[name].bundle.js'
    },
    module: (() => {
      if (isProduction) return {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'public'),
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { modules: false }]
              ]
            }
          }]
        },
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader?sourceMap",
            use: [
              'css-loader?importLoaders=1&sourceMap',
              'postcss-loader?',
              'sass-loader?sourceMap'
            ]        
          })
        },
        {
          test: /\.(png|jpg)$/,
          use: [{
            loader: 'url-loader?sourceMap',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }]        
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/, //removed eot|ttf fonts
          use: [{
            loader: 'file-loader?sourceMap',
            options: { name: '../fonts/[name].[ext]'}
          }]
          // loader: 'file-loader?name=public/fonts/[name].[ext]'
        }              
      ]
      }
      else return {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'public'),
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { modules: false }]
              ]
            }
          }]
        },
        {
          test: /\.(scss|css)$/,
          use: 
              [
            'style-loader?sourceMap',
            'css-loader?importLoaders=1&sourceMap',
            'postcss-loader?',
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(png|jpg)$/,
          use: [{
            loader: 'url-loader?sourceMap',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }]        
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/, //removed eot|ttf fonts
          use: [{
            loader: 'file-loader?sourceMap',
            options: { name: '../fonts/[name].[ext]'}
          }]
          // loader: 'file-loader?name=public/fonts/[name].[ext]'
        }              
      ]
      }
    })(),


    plugins: [
      new ExtractTextPlugin("../css/styles.css"),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),   
      extractCommons,
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),            
    ],
    devServer: {
      open: true, // to open the local server in browser
      inline: true,
      publicPath: '/js/', //was dist
      contentBase: path.join(__dirname, "/public/"),
      compress: true
    },
    devtool: (() => {
      if (isProduction) return 'source-map'
      else return 'source-map'
    })(),    
  }
}
