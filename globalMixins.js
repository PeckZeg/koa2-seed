require('babel-register');
require('app-module-path').addPath(process.cwd());

const assign = require('lodash/assign');

const config = require('./config');

assign(global, module.exports = {
  config
});
