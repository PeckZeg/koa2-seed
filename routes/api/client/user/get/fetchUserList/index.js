exports.pathname = '/';

exports.handler = async function(ctx) {
  ctx.body = {
    pathname: ctx.url,
    action: 'fetch user list',
    query: ctx.query
  };
};
