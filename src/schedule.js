const schedule = require('node-schedule');
const { getNightTop } = require('./hot');
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const mongoUrl = `mongodb://${mongo.user}:${mongo.pass}@${mongo.ip}:27017/crawler?authSource=admin`

mongolass.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const biliList = mongolass.model('biliList')

const onUpdate = async (dataList) => {
  return await biliList.insertMany(dataList)
}

const  scheduleCronstyle = () =>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('59 23 * * *',async () => {
        await pushData()
    }); 
}

const pushData = async () => {
  const list = await getNightTop();
  const result = await onUpdate(list)
}

module.exports = {
  scheduleCronstyle
}