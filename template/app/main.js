/*
 * Highly opinionated VueJS boilerplate ({{ template_version }})
 *
 * @author  Alexander Jung <alexander@jung.net>
 */

'use strict'

{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in config/default.js with an alias.

{{/if_eq}}
import Vue from 'vue'
import app from './app'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(app)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { app },
  template: '<app/>'
  {{/if_eq}}
})
