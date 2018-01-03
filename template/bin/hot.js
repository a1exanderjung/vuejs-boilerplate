/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

require('./check')()

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')

const config = require('../config')
const port = process.env.PORT || config.runtime.port
const uri = 'http://localhost:' + port
const app = express()
const compiler = webpack(config.webpack)

const proxyMiddleware = require('http-proxy-middleware')
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.paths.public,
  quiet: true
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  heartbeat: 2000
})

// Enable hot-reload and state-preserving compilation error display
app.use(hotMiddleware)

// Proxy API requests
Object.keys(config.api.proxies).forEach(function (context) {
  let options = proxyTable[context]

  if (typeof options === 'string') {
    options = { target: options }
  }

  app.use(proxyMiddleware(options.filter || context, options))
})

// Handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// Serve webpack bundle output
app.use(devMiddleware)

// Serve pure static assets
app.use(config.paths.static, express.static('./static'))

var _resolve
var _reject
var server
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }

    console.log('> Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (config.runtime.env !== 'testing') {
      // opn(uri)
    }

    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
