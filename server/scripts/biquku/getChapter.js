// 获取小说
// http://www.biquku.la/

'use strict'
const https = require('axios')
const cheerio = require('cheerio')

const getBookChapter = async (url) => {
  return https.get(url)
    .then(({ data }) => {
      let $ = cheerio.load(data)
      // console.log($('#content').html())
      return $('#content').html()
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = getBookChapter
