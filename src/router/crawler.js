var Router = require('koa-router');

var router = new Router({
  prefix: '/crawler'
});
router.get('/', async (ctx, next) => {
  try {
    const bililists =  await ctx.db.collection('bililists').find().toArray()
    ctx.body = bililists
  } catch(err) {
    ctx.body = err
  }
});

module.exports = router
