// 获取小说
// http://www.biquku.la/

'use strict'
const https = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const _initMongoDB = require('../../model')
const BookCity = require('../../model/bookCity')

const getBooks = async ({ hostname, url, count = 1, page = 0, type } = {}) => {
  let books = []
  await new Promise((resolve, reject) => {
    console.log(`${hostname}/${url}${count}${page ? ('/index' + page + '.html') : ''}`)
    https.get(`${hostname}/${url}${count}${page ? ('/index' + page + '.html') : ''}`)
      .then(async ({ data }) => {
        // dom真实数组容器
        let bookStore = []
        let $ = cheerio.load(data)
        // 书本列表
        let $books = $('#hotcontent .ll  > .item')
        // dom数组转数组
        $books.each((el) => {
          bookStore.push(el)
        })
        // 为了可以异步执行 采用for in 语法
        for (let key in bookStore) {
          // 当前的书本
          let el = $books[key]
          // 爬取每页书籍的详情 书本id $(el).find('.image > a').prop('href')
          await getBookDetail($(el).find('.image > a').prop('href'), type, hostname, books)
        }
        bookStore = null
        $ = null
        $books = null
        resolve(books)
      })
  })
  // 当前页的所有书籍
  return books
}
const getBookDetail = async (bookId, type, hostname, books) => {
  await new Promise((resolve, reject) => {
    https.get(bookId)
      .then(({ data }) => {
        let $ = cheerio.load(data)
        let $fmimg = $('#fmimg')
        let $info = $('#info')
        let $intro = $('#intro')
        let author = $info.find('p').eq(0).text()
        let updateTime = $info.find('p').eq(2).text().replace(/更新时间：/, '')
        let chapterList = []
        author = author.substr(author.indexOf('：') + 1)
        updateTime = new Date(updateTime).getTime()
        $('#list dd').each((index, el) => {
          chapterList.push({
            id: $(el).find('a').prop('href'),
            title: $(el).find('a').text()
          })
        })
        // 存入书本 这里的书本信息更详细
        books.push({
          bookId,
          pic: `${hostname}${$fmimg.find('img').prop('src')}`,
          name: $fmimg.find('img').prop('alt'),
          author,
          type,
          status: $fmimg.find('span').prop('class') === 'b' ? '连载中' : '已完结',
          content: $intro.find('p').eq(0).text(),
          updateTime,
          latestChapter: $info.find('p').eq(3).text().replace(/最新章节：/, ''),
          chapterList: chapterList
        })
        console.log(`${books.length}-获取${type}小说：${$fmimg.find('img').prop('alt')}--作者：${author}`)
        $ = null
        $fmimg = null
        $info = null
        author = null
        updateTime = null
        chapterList = null
        resolve()
      })
  })
}
const saveBooksFile = async (bookTable, fileName, number) => {
  // 创建文件目录
  await new Promise((resolve, reject) => {
    fs.mkdir(path.join(__dirname, '../books'), () => {
      const writeStream = fs.createWriteStream(path.join(__dirname, `../books/${fileName}${number}.json`))
      writeStream.on('open', () => {
        console.log('打开')
      })
      writeStream.on('ready', () => {
        console.log('开始')
        writeStream.write(JSON.stringify(bookTable))
        writeStream.end()
      })
      writeStream.on('finish', () => {
        console.log(`文件写入成功`)
      })
      writeStream.on('close', () => {
        console.log('关闭')
        resolve()
      })
    })
  })
  return `${fileName}${number}`
}
const saveModelBooks = async (fileName) => {
  await new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, `../books/${fileName}.json`), (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        const bookStore = JSON.parse(data.toString())
        bookStore.forEach(({
          bookId,
          pic,
          name,
          author,
          type,
          status,
          content,
          latestChapter,
          chapterList
        }, index) => {
          let bC = new BookCity({
            bookId,
            pic,
            name,
            author,
            type,
            status,
            content,
            latestChapter,
            chapterList
          })
          bC.save(() => {
            console.log(`${index}-存入一本书${name}`)
          })
          bC = null
        })
        resolve()
      }
    })
  })
}
const loopGetBooks = async ({ hostname, url, count, page, type, pageNum = 5 }) => {
  let bookTable = []
  console.log('爬取中...')
  while (page) {
    bookTable = [...bookTable, ...await getBooks({
      hostname,
      url,
      type,
      count,
      page
    })]
    // 爬取五张页面后，存取一次，然后清除数组，避免堆区占满
    if (page % pageNum === (pageNum > 1 ? 1 : 0)) {
      // 最好做一次分段存取 否则js内存堆区不够用
      await saveModelBooks(await saveBooksFile(bookTable, type, parseInt(page / pageNum)))
      bookTable = []
    }
    page--
  }
  console.log('爬取完成！')
}
const toSave = async () => {
  let index = 1
  const mapping = {
    '玄幻': 339,
    '修真': 145,
    '都市': 447,
    '穿越': 114,
    '网游': 126,
    '科幻': 455
  }
  const { entries } = Object
  // 启动mongo
  await _initMongoDB()
  // 多异步爬取页面
  for (let [key, value] of entries(mapping)) {
    loopGetBooks({
      hostname: 'http://www.biquku.la',
      url: 'xiaoshuo',
      count: index++,
      type: key,
      page: value,
      pageNum: 10
    })
  }
}

toSave()
