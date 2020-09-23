'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: process.env.BD_TYPE === 'test' ? '"http://139.196.86.193:8098/weChat"' : '"http://139.196.86.193:8098/weChat_prod"'
