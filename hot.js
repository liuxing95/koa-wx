const cheerio = require('cheerio');
const apiUrl = 'https://www.bilibili.com/ranking/';
const { crawler, crawler_nightmare } = require('./common.js')

const getTop = async () => {
  const result = await crawler(apiUrl).then((res) => {
    // 爬取到到页面到数据
    const $ = cheerio.load(res.text, { decodeEntities: false });
    const categories = []
    $('.rank-item').each((i, ele) => {
      const _self = $(ele);
      const _linkItem = _self.find('.content .img a')
      const _linkItemInfo = _self.find('.content .info')
      const _linkItemInfoDetail = _self.find('.content .info .detail')
      categories.push({
        play_url: _linkItem.attr('href'),
        img_url: _linkItem.find('div').html(),
        alt: _linkItemInfo.find('.info a').text(),
        detail: {
          play_num: $(_linkItemInfoDetail.find('.data-box')[0]).text(),
          view_num: $(_linkItemInfoDetail.find('.data-box')[1]).text(),
          author: _linkItemInfoDetail.find('a .data-box').text(),
          author_url: _linkItemInfoDetail.find('a').attr('href'),
        }
      });
    });
    return {
      categories
    }
  })
  return result
}

const getNightTop = async () => {
  const getContainerHtml = () => {
    document.querySelector(".rank-list").innerHTML
  }
  const result = await crawler_nightmare(apiUrl, getContainerHtml).then((res) => {
    // 爬取到到页面到数据
    const $ = cheerio.load(res, { decodeEntities: false });
    const categories = []
    $('.rank-item').each((i, ele) => {
      const _self = $(ele);
      const _linkItem = _self.find('.content .img a')
      const _linkItemInfo = _self.find('.content .info')
      const _linkItemInfoDetail = _self.find('.content .info .detail')
      categories.push({
        play_url: _linkItem.attr('href'),
        img_url: _linkItem.find('div img').attr('src'),
        alt: _linkItemInfo.find('.info a').text(),
        detail: {
          play_num: $(_linkItemInfoDetail.find('.data-box')[0]).text(),
          view_num: $(_linkItemInfoDetail.find('.data-box')[1]).text(),
          author: _linkItemInfoDetail.find('a .data-box').text(),
          author_url: _linkItemInfoDetail.find('a').attr('href'),
        }
      });
    });
    return categories
  })
  return result
}


// getNightTop()

module.exports = {
  getNightTop
}
