/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const styleLoaders = require('../tools/style-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const _ = (x) => path.resolve(__dirname, '../', x)

var _default = require('./default')
var config = {}


/*
 * Runtime informaton & configuration
 */
config.runtime = {}

// Runtime environment shortcut
config.runtime.env = 'development'

// Enable source maps
config.runtime.enableSourceMap = true

process.env.NODE_ENV = '"development"'


/*
 * Path configuration
 */
config.paths = {}

// Application default entry file
config.paths.index = _('app/index.html')

// Static content directory
config.paths.static = 'static'

/*
 * Webpack configuration defaults
 * https://webpack.js.org/configuration/
 */
config.webpack = {}

// These options determine how the different types of modules within a project
// will be treated.
// https://webpack.js.org/configuration/module/
config.webpack.module = {}

// Extension processing rules
// https://webpack.js.org/configuration/module/#rule
config.webpack.module.rules = [
  // vue-loader
  // https://github.com/vuejs/vue-loader
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    include: _('app'),
    exclude: /node_modules/,
    options: {
      loaders: styleLoaders.cssLoaders({
        sourceMap: config.runtime.enableSourceMap,
        extract: false
      }),
      postcss: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        })
      ]
    }
  }
]

config.webpack.module.rules = config.webpack.module.rules.concat(styleLoaders.allRules({
  sourceMap: config.runtime.enableSourceMap
}))

// This option controls if and how source maps are generated.
// eval-source-map is faster for development
// https://webpack.js.org/configuration/devtool/
config.webpack.devtool = '#cheap-module-eval-source-map'

// A list of webpack plugins.
// https://webpack.js.org/configuration/plugins/
config.webpack.plugins = [

  // Creates global constants which can be configured at compile time
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    'process.env': process.env
  }),

  //
  //
  new webpack.HotModuleReplacementPlugin(),

  //
  //
  new webpack.NoEmitOnErrorsPlugin(),

  // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    inject: true
  }),

  //
  //
  new FriendlyErrorsPlugin()
]

// Provide config when imported and override defaults
module.exports = merge(_default, config)
