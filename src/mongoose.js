// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://119.45.136.117:27017/crawler', { useUnifiedTopology: true, useNewUrlParser: true })

// connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。
var db = mongoose.connection;
db.on('error',  console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // console.log("we're connected!")
  console.log("we're connected!")
})

var biliSchema = mongoose.Schema({
  play_url: String,
  img_url: String,
  alt: String,
  detail: {

  }
})
var biliList = mongoose.model('biliList', biliSchema)

module.exports = {
  db,
  mongoose,
  biliList
}
