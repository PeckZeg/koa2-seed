const { NODE_ENV = 'development' } = process.env;
const baseConfig = require('./base');
const envConfig = require(`./${NODE_ENV}`);

module.exports = {
  ...baseConfig,
  ...envConfig
};
