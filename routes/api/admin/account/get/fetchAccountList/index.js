exports.pathname = '/';
// exports.middleware = [];
exports.handler = async function (ctx) {
  ctx.body = {
    pathname: exports.pathname,
    name: 'fetch account list'
  };
};
