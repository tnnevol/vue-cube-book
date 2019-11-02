'use strict'

const https = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const jsdom = require('jsdom')
const JSDOM = jsdom.JSDOM

// 获取高德api
const getGmapApi = () => {
  return https.get('https://webapi.amap.com/maps', {
    params: {
      v: '1.4.15',
      key: '9018a070c8b08d57895282f8446f50d6'
    }
  })
    .then(({ data: res }) => {
      var window = new JSDOM('body').window
      var document = new JSDOM('body').window.document
      // eval(`${res}`)
      console.log(window.AMapUI)
    })
}
getGmapApi()
// console.log(window.navigator)

// console.log('执行完成！！')
