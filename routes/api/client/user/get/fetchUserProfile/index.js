exports.pathname = '/:userId';

exports.handler = async function(ctx) {
  ctx.body = {
    pathname: ctx.url,
    params: ctx.params,
    query: ctx.query
  };
};
