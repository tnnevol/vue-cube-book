const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const upload = require('../multerUtil')

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
/**
 * 文件上传
 */
router.post('/upload', upload.single('logo'), (req, res, next) => {
  // console.log(req);
  // console.log(req.file);
  console.log(req)
  if (!req.file) {
    return res.status(200).send({
      status: 0,
      msg: '无文件'
    })
  }
  res.send({
    status: 1,
    msg: '上传文件成功'
  })
  next()
})

module.exports = router
