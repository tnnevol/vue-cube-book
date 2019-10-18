const express = require('express')
// const getFiction = require('../../scripts/biquku/getFiction.js')
const BookCity = require('../../model/bookCity')
const path = require('path')
const fs = require('fs')
const fn = require('../../fn')
const baseCfg = require('../base.cfg')
const requestCpter = require('../../scripts/biquku/getChapter')
const router = express.Router()

router.get('/', async (req, res) => {
  let { type, page = 0, count = 20 } = req.query
  const mappingType = [
    '精选',
    '玄幻',
    '修真',
    '都市',
    '穿越',
    '网游',
    '科幻',
    '排行',
    '全部'
  ]
  page = Number(page)
  count = Number(count)
  if (!type) {
    return res.status(200).send({
      status: 0,
      msg: '参数错误',
      data: null
    })
  }
  try {
    return res.status(200).send({
      status: 1,
      msg: 'REQUEST SUCCESS',
      data: {
        info: await fn.getPage({
          model: BookCity,
          type: mappingType[type],
          page,
          count
        }),
        total: await fn.modelCount(BookCity)
      }
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/getChapter', async (req, res) => {
  let { bookId, chapterNumber } = req.query
  let data = baseCfg.respInfo
  let chapterId = null
  const cpter = await BookCity.find({ bookId }, { chapterList: 1, _id: 0 }).exec()
  const chapterList = cpter[0].chapterList
  if (!(bookId && chapterNumber)) {
    return res.status(200).send(data)
  }
  if (chapterList[chapterNumber]) {
    chapterId = chapterList[chapterNumber].id
    data = {
      info: {
        ...chapterList[chapterNumber],
        content: await requestCpter(bookId + chapterId),
        count: chapterList.length
      },
      msg: 'success',
      status: 1,
      code: 200
    }
  }
  return res.status(200).send(data)
})

router.get('/saveBooks', async (req, res) => {
/*  await getFiction({
    hostname: 'http://www.biquku.la',
    url: 'xiaoshuo',
    count: 2,
    type: '修真',
    page: 145
  }) */
  fs.readFile(path.resolve(__dirname, '../../scripts/books/book.json'), (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const books = JSON.parse(data.toString())
      books.forEach(({
        bookId,
        pic,
        name,
        author,
        type,
        status,
        content
      }, index) => {
        const bC = new BookCity({
          bookId,
          pic,
          name,
          author,
          type,
          status: '',
          content
        })
        bC.save(() => {
          console.log(`${index}-存入一本书${name}`)
          return res.send(`${index}-存入一本书${name}`)
        })
      })
    }
  })
})

router.get('/getBooks/:type', (req, res) => {
  if (!req.params.type) {
    return res.render('books', {
      status: 0,
      msg: '参数错误',
      data: null
    })
  }
  BookCity.find({ type: req.params.type }, (err, docs) => {
    if (err) return err
    return res.render('books', {
      status: 1,
      msg: 'REQUEST SUCCESS',
      data: docs
    })
  })
})

module.exports = router
