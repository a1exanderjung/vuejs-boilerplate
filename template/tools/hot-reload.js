/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */
'use strict'

/* eslint-disable */

require('eventsource-polyfill')

var hot = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hot.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
