const schedule = require('node-schedule');
const { getNightTop } = require('./hot');
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect('mongodb://119.45.136.117:27017/crawler', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})// const mongolass = new Mongolass('mongodb://localhost:27017/test')

const biliList = mongolass.model('biliList')

const onUpdate = async (dataList) => {
  console.log(dataList)
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
  console.log(list)
  const result = await onUpdate(list)
  console.log(result)
}


module.exports = {
  scheduleCronstyle
}