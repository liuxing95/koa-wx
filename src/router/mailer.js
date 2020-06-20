var Router = require('koa-router');
const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')
const { mailerCode } = require('../../config.js')

let transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true, // 使用了SSL
  auth: {
    user: '1358974006@qq.com',
    pass: mailerCode, //授权码，并非QQ密码
  }
})

let mailOptions = {
  from: '"liuxing" 1358974006@qq.com', // 发送地址
  to: "liutong@moresec.cn", // 接收列表（可多个）
  subject: "Hello,this is alan from China!", // 主题
  // 发送text或者html格式（任选一个）
  text: 'Hello world！不是刘兴发的', // plain text body
  //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
  html: '<img src="cid:01">', 
  attachments: [                 //添加附件（可多个）
    {
      filename: "a.txt",
      content: "hello world!",
    },
  ],
}

var router = new Router({
  prefix: '/mailer'
});
router.get('/', async (ctx, next) => {
  try {
    ctx.body = await transporter.sendMail(mailOptions)
  } catch(err) {
    ctx.body = err
  }
});

module.exports = router