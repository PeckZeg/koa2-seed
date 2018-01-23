const Router = require('koa-router');
const glob = require('glob');
const path = require('path');

const isFunction = require('lodash/isFunction');
const toLower = require('lodash/toLower');
const replace = require('lodash/replace');
const compact = require('lodash/compact');

const types = {
  'client': ''
};

const ignore = '_**';
let routers = [];

// const rmDirSlash = pathname => toLower(replace(pathname, /\/$/, ''));

for (let type of glob.sync('*/', { cwd: __dirname, ignore })) {
  type = toLower(replace(type, /\/$/, ''));
  const cwd = path.join(__dirname, type);

  for (let category of glob.sync('*/', { cwd, ignore })) {
    category = toLower(replace(category, /\/$/, ''));

    const cwd = path.join(__dirname, type, category);
    const prefix = `/${types[type] ?types[type] : type}/${category}`;
    const router = new Router({ prefix });

    for (let method of glob.sync('*/', { cwd, ignore })) {
      method = toLower(replace(method, /\/$/, ''));
      const cwd = path.join(__dirname, type, category, method);
      let apiParams = {};
      let apis = [];

      for (let route of glob.sync('*/', { cwd, ignore })) {
        const { pathname, middleware, handler } = require(
          replace(path.join(cwd, route), /\/$/, '')
        );

        if (pathname && isFunction(router[method]) && isFunction(handler)) {
          apis.push(pathname);
          apiParams[pathname] = {
            method,
            params: compact([pathname, middleware, handler])
          };
        }
      }

      for (let route of apis.sort((a, b) => a.indexOf(':') > b.indexOf(':'))) {
        const { method, params } = apiParams[route];
        router[method](...params);
      }
    }

    routers.push(router);
  }
}

module.exports = routers;
