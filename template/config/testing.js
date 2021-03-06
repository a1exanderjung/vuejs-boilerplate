/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

var merge = require('webpack-merge')
var _default = requrie('./default')
var config = {}

/*
 * Runtime informaton & configuration
 */
config.runtime = {}

// Runtime environment shortcut
config.runtime.env = 'testing'

// Provide config when imported and override defaults
module.exports = merge(_default, config)
