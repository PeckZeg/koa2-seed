const combineRouters = require('koa-combine-routers');
const Router = require('koa-router');
const apiRouters = require('./api');
const dogRouter = new Router();
const catRouter = new Router();

dogRouter.get('/dogs', async ctx => {
  ctx.body = 'ok'
});

catRouter.get('/cats', async ctx => {
  ctx.body = 'ok'
});

module.exports = combineRouters(apiRouters);
