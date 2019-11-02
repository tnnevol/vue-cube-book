const axios = require('axios')
const fs = require('fs')
const path = require('path')
const dateFormat = (date, format) => {
  if (typeof date === 'string') {
    let mts = date.match(/(\/Date(\d+)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }
  date = new Date(date)
  if (!date || date.toUTCString() === 'Invalid Date') {
    return ''
  }

  let map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

setInterval(() => {
  axios({
    headers: {
      accessToken: 'co_token_6_3_ff756bf8313e41368e60776c32c1253f'
    },
    url: 'https://zaiottest.snkoudai.com/api/iot/co/companyuser/ref/list',
    data: {
      companyId: 4
    },
    type: 'post'
  })
    .then((res) => {
      fs.writeFile(path.resolve(__dirname, '../log/press-log.txt'), `${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss:SS')}: 请求test\n`, {
        flag: 'a'
      }, (err) => {
        if (err) throw err
        console.log(`${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}: 请求test\n`)
      })
    })
}, 10)
