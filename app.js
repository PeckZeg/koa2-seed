const reqLogger = require('koa-request-params-logger');
const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const debug = require('debug')('www');
const logger = require('koa-logger');
const json = require('koa-json');
const etag = require('koa-etag');
const Koa = require('koa');


const app = new Koa();
const router = require('./routes');

// error handler
onerror(app);

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(etag())
  .use(logger())
  .use(reqLogger())
  .use(require('koa-static')(config.folders.static))
  .use(router);

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  debug(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.on('error', function(err, ctx) {
  console.error(err)
  logger.error('server error', err, ctx)
});

module.exports = app;
