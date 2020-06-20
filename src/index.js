const Koa = require('koa');
var Router = require('koa-router');
const mongo = require('koa-mongo')


const app = new Koa();
var router = new Router();

const { scheduleCronstyle } = require('./schedule')
const mongoUrl = `mongodb://root:liuxing0724@119.45.136.117:27017/crawler?authSource=admin`

app.use(mongo({
  uri: mongoUrl, //or url
  max: 100,
  min: 1,
}, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}))
scheduleCronstyle(app)


router.get('/', async (ctx, next) => {
  try {
    const bililists =  await ctx.db.collection('bililists').find().toArray()
    ctx.body = bililists
  } catch(err) {
    ctx.body = err
  }
  // ctx.router available
});


app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);