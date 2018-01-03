/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

require('shelljs/global')

// Global variables
var path = require('path')
var config = require('config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

// Prompt status
var spinner = ora('Building application...')
spinner.start()

// Recreate the assets path
rm('-rf', config.assets)
mkdir('-p', config.assets)
cp('-R', 'static/*', config.assets)

// Build
webpack(webpackConfig, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
