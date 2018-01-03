/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var _default = requrie('./default')
var config = {}
var _ = (x) => path.resolve(__dirname, '../', x)

/*
 * Runtime informaton & configuration
 */
config.runtime = {}

// Runtime environment shortcut
config.runtime.env = 'production'

/*
 * Webpack configuration defaults
 * https://webpack.js.org/configuration/
 */
config.webpack = {}

// Options affecting the output of the compilation.
// https://webpack.js.org/configuration/output/
config.webpack.output = {
  path:  _('dist'),
  publicPath: '/',
  filename: _('static/js/[name].[chunkhash].js'),
  chunkFilename: _('static/js/[id].[chunkhash].js')
}

// These options determine how the different types of modules within a project
// will be treated.
// https://webpack.js.org/configuration/module/
config.webpack.module = {}

// Extension processing rules
// https://webpack.js.org/configuration/module/#rule
config.webpack.module.rules = [

]

// This option controls if and how source maps are generated.
// eval-source-map is faster for development
// https://webpack.js.org/configuration/devtool/
config.webpack.devtool = '#source-map'

// A list of webpack plugins.
// https://webpack.js.org/configuration/plugins/
config.webpack.plugins = [

  // Creates global constants which can be configured at compile time
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    'process.env': env
  }),

  // UglifyJS plugin for webpack
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),

  //
  //
  new webpack.optimize.OccurrenceOrderPlugin(),

  // extract css into its own file
  new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: config.build.index,
    template: 'src/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),

  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0
      )
    }
  }),

  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })
]

// Provide config when imported and override defaults
module.exports = merge(_default, config)
