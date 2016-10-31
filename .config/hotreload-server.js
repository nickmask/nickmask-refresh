require('babel-register')
require('babel-polyfill')

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const webpackConfig = require('./webpack.hotreload.config.babel')

new WebpackDevServer(webpack(webpackConfig), {
  inline: true,
  historyApiFallback: true, // Allows reloading of any URL
  hot: true, // Auto refresh page
  publicPath: webpackConfig.output.publicPath, // Public bath
  quiet: false, // Hides Errors
  stats: {
    chunks: false, // Hides the build chunks
    colors: true, // Colors the output
  },
  watchOptions: {
    ignored: /node_modules/, // Don't hot reload node modules
  },
  contentBase: 'src/',
  port: 3000,
  host: '0.0.0.0',
}).listen(3000, '0.0.0.0', (err, result) => {
  if (err) {
    console.log(err, result) //eslint-disable-line
  }
  console.log('Starting the development server on port 3000 👌') //eslint-disable-line
})
