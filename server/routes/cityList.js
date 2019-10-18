const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const upload = require('../multerUtil')
const path = require('path')
const formInfo = {}

router.get('/cityList', function (req, res, next) {
  const province = require('../static/province.json')
  return res.send({
    status: 1,
    msg: 'success',
    province
  })
})
module.exports = router
