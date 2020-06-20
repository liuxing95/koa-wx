const Koa = require('koa');
const mongo = require('koa-mongo')
const CraelerRouter = require('./router/crawler.js')
const MailRouter = require('./router/mailer.js')
const { mongo } = require('../config.js')


const app = new Koa();
const { scheduleCronstyle } = require('./schedule')
const mongoUrl = `mongodb://${mongo.user}:${mongo.pass}@${mongo.ip}:27017/crawler?authSource=admin`

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