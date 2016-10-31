/* eslint-disable */
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import path from 'path'
import HtmlWebpackPlugin from'html-webpack-plugin'

import cssnext from 'postcss-cssnext'
/* eslint-enable */

const PATHS = {
  src: path.join(__dirname, 'src'),
  app: path.join(__dirname, 'src/client/app.js'),
  dist: path.join(__dirname, 'dist'),
  client: path.join(__dirname, 'src', 'client'),
}

const webpackConfig = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000', // Webpack dev server
      'webpack/hot/dev-server', // Webpack dev server auto refresh / hot loading
      'react-hot-loader/patch', // Add react hot loader 3
      PATHS.app,
    ],
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js', // Output name of bundle
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // Javascript loader
        include: PATHS.src,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['modern-browsers', 'react', 'stage-2'],
          plugins: [
            'react-hot-loader/babel',
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.css/,
        exclude: 'node_modules',
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
          'postcss',
          'sass',
        ],
      },
    ],
  },
  postcss: () => ([
    cssnext,
  ]),
  sassLoader: {
    data: '@import "shared/styles/main.scss";',
    includePaths: [PATHS.src],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.src, 'index.html'), // Use index.html as template for index.html
      chunksSortMode: 'dependency', // Order the dependacy so that bundle comes first
      filename: 'index.html', // Output file name
      inject: 'body', // Enject into the end of the body tag
    }),
    new webpack.HotModuleReplacementPlugin(), // Auto refresh page
    new webpack.DefinePlugin({ 'process.env': {
      IMAGE_STORAGE_URL: JSON.stringify(process.env.IMAGE_STORAGE_URL),
      NODE_ENV: JSON.stringify('development'),
      DEBUG: JSON.stringify(process.env.DEBUG === 'true'),
    } }),
  ],
}

export default webpackConfig
