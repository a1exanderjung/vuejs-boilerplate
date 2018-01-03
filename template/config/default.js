/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

const path = require('path')
const _ = (x) => path.resolve(__dirname, '../', x)

var config = {}

/*
 * Runtime informaton & configuration
 */
config.runtime = {}

// Runtime environment shortcut
config.runtime.env = process.env.NODE_ENV

// Runtime default port
config.runtime.port = 8080

// Enable source maps
config.runtime.enableSourceMap = true

/*
 * Path configuration
 */
config.paths = {}

// Application default entry file
config.paths.index = _('app/index.html')

// Root directory
config.paths.root = _('/')

// Assets directory
config.paths.assets = 'app/assets'

// Static content directory
config.paths.static = 'static'

// Public assets path
config.paths.public = '/'

/*
 * API configuration
 */
config.api = {}

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
config.api.proxies = {}

/*
 * Build configuration
 */
config.build = {}

// Compress built or bundled files
config.build.compress = false

/*
 * Webpack configuration defaults
 * https://webpack.js.org/configuration/
 */
config.webpack = {}

// The entry point for the webpack bundle.
// https://webpack.js.org/configuration/entry-context/#entry
config.webpack.entry = {
  app: './app/main.js'
}

// Options affecting the output of the compilation.
// https://webpack.js.org/configuration/output/
config.webpack.output = {
  path: path.resolve(config.paths.root, config.paths.assets),
  filename: '[name].js',
  publicPath: config.paths.public
}

// These options change how modules are resolved.
// https://webpack.js.org/configuration/resolve/
config.webpack.resolve = {}

// Replace modules with other modules or paths.
// https://webpack.js.org/configuration/resolve/#resolve-alias
config.webpack.resolve.alias = {
  {{#if_eq build "standalone"}}
  'vue$': 'vue/dist/vue.esm.js',
  {{/if_eq}}
  '~': _('app')
}

// An array of extensions that should be used to resolve modules which enables
// `imports` to leave off the extension.
// https://webpack.js.org/configuration/resolve/#resolve-extensions
config.webpack.resolve.extensions = ['.js', '.vue', '.json']

// These options determine how the different types of modules within a project
// will be treated.
// https://webpack.js.org/configuration/module/
config.webpack.module = {}

// Extension processing rules
// https://webpack.js.org/configuration/module/#rule
config.webpack.module.rules = [

  {{#lint}}
  // eslint-loader
  // https://github.com/MoOx/eslint-loader
  {
    enforce: "pre",
    test: /\.(js|vue)$/,
    include: [_('app'), _('test')],
    loader: "eslint-loader",
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  {{/lint}}

  // svg-sprite-loader
  // https://github.com/kisenka/svg-sprite-loader
  {
    test: /\.svg(\?.*)?$/,
    loader: 'svg-sprite?' + JSON.stringify({
      name: '[name]-[hash]',
      spriteModule: 'tools/sprite',
      prefixize: true
    })
  },

  // url-loader
  // https://github.com/webpack-contrib/url-loader
  {
    test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
    loader: 'file-loader',
    query: {
      emitFile: false,
      name: 'static/assets/img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: path.resolve(config.paths.public, 'media/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: path.resolve(config.paths.public, 'fonts/[name].[hash:7].[ext]')
    }
  }
]

// Provide config when imported
module.exports = config
