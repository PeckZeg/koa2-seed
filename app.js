const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const debug = require('debug')('www');
const logger = require('koa-logger');
const json = require('koa-json');
const etag = require('koa-etag');
const path = require('path');
const Koa = require('koa');

const app = new Koa();
const router = require('./routes');

// error handler
onerror(app);

// middlewares
app.use(bodyparser())
  .use(json())
  .use(etag())
  .use(logger())
  .use(require('koa-static')(path.join(process.cwd(), config.folders.static)))
  // .use(views(path.join(__dirname, '/views'), {
  //   options: {settings: {views: path.join(__dirname, 'views')}},
  //   map: {'njk': 'nunjucks'},
  //   extension: 'njk'
  // }))
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
