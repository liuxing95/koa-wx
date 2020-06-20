const Koa = require('koa');
const mongo = require('koa-mongo')
const CraelerRouter = require('./router/crawler.js')
const MailRouter = require('./router/mailer.js')


const app = new Koa();
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



app
  .use(CraelerRouter.routes())
  .use(CraelerRouter.allowedMethods())
  .use(MailRouter.routes())
  .use(MailRouter.allowedMethods());
app.listen(3000);