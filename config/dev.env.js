'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://139.196.86.193:8098/weChat"'
  // BASE_URL: '"http://127.0.0.1:8081/weChat"'
})
