const Koa = require('koa');
var Router = require('koa-router');
const mongo = require('koa-mongo')


const app = new Koa();
var router = new Router();

const { scheduleCronstyle } = require('./schedule')

app.use(mongo({
  uri: 'mongodb://119.45.136.117:27017/crawler', //or url
  max: 100,
  min: 1
}, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}))
scheduleCronstyle()


router.get('/', async (ctx, next) => {
  const bililists =  await ctx.db.collection('bililists').find().toArray()
  console.log(bililists)
  ctx.body = bililists
  // ctx.router available
});


app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);