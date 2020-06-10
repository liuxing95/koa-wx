const superagent = require('superagent');
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: false});  // show:true  显示内置模拟浏览器
// var charset = require("superagent-charset");
// charset(superagent); //设置字符

function crawler(url, cb) {
  return new Promise((resolve, reject) => {
    superagent.get(url).set({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }).end(function(err, res) {
      // 抛错拦截
      if (err) {
        console.log(err)
        reject(err)
        return;
      }
      resolve(res);
    })
  })
}

function crawler_nightmare(url) {
  return new Promise((resolve, reject) => {
    nightmare
      .goto(url)
      .wait(2000) // 3000 的意思是当模拟浏览器打开后会等待6秒再爬取页面数据，有这段时间就可以做你想要的动态加载操作
      .scrollTo(1 * 10e10, 0)
      .wait(1000)
      .evaluate(() => document.querySelector("body").innerHTML) // 这里一定要取到你想要爬取数据区域的容器的类名
      .end((htmlStr) => {
        resolve(htmlStr)
      })
      .then(htmlStr => {
        resolve(htmlStr)
      })
  })
}

module.exports = {
  crawler,
  crawler_nightmare
}