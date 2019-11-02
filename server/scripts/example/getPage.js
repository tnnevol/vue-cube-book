'use strict'
const https = require('https')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
// : 'www.kuaidaili.com'
// /ops/proxylist/1/  身份证
// 小说
/*
 穿越 1
 都市 0
 科幻 0
 网游 1
 修真 1
 玄幻 0
*/
const getProxy = async ({ hostname, url, port = 443, count = 1 } = {}) => {
  let html = ''
  let proxys = []
  const pageOpts = {
    hostname,
    path: `${url}/${count}`,
    port
  }

  await new Promise((resolve, reject) => {
    https.get(pageOpts, (res) => {
      // 设置编码
      res.setEncoding('utf-8')

      // 抓取页面内容
      res.on('data', (chunk) => {
        html += chunk
      })

      res.on('end', () => {
        const $ = cheerio.load(html)
        $('#freelist tbody tr').each((index, el) => {
          const ip = $(el).find('td[data-title="IP"]').text()
          const port = $(el).find('td[data-title="PORT"]').text()
          const position = $(el).find('td[data-title="位置"]').text()
          const update = $(el).find('td[data-title="最后验证时间"]').text()
          // 匿名度
          const anonymity = $(el).find('td[data-title="匿名度"]').text()
          const type = $(el).find('td[data-title="类型"]').text()
          const support = $(el).find('td[data-title="get/post支持"]').text()
          const responseSpeed = $(el).find('td[data-title="响应速度"]').text()
          proxys.push({
            ip,
            port,
            position,
            update,
            anonymity,
            type,
            support,
            responseSpeed
          })
        })

        return resolve(proxys)
      })
    }).on('error', err => {
      reject(err)
      // console.log('err', err);
    })
  })

  return proxys
}

const loopGetProxy = async ({ hostname, url, count }) => {
  let proxyTable = []
  while (count) {
    proxyTable = [...proxyTable, ...await getProxy({
      hostname,
      url,
      count
    })]
    count--
  }
  // 创建文件目录
  fs.mkdir(path.join(__dirname, '../proxyTable'), () => {
    const writeStream = fs.createWriteStream(path.join(__dirname, '../proxyTable/proxy.json'))
    writeStream.on('open', () => {
      console.log('打开')
    })
    writeStream.on('ready', () => {
      console.log('开始')
      writeStream.write(JSON.stringify(proxyTable))
      writeStream.end()
    })
    writeStream.on('finish', () => {
      console.log(`文件写入成功`)
    })
    writeStream.on('close', () => {
      console.log('关闭')
    })
  })
}
loopGetProxy({
  hostname: 'www.kuaidaili.com',
  url: '/ops/proxylist',
  count: 10
})
