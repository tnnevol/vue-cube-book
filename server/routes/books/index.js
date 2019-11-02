const express = require('express')
const BookCity = require('../../model/bookCity')
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
        total: await fn.modelCount(BookCity, mappingType[type])
      }
    })
  } catch (e) {
    console.log(e)
  }
})

// 获取章节
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

// 获取书籍
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
