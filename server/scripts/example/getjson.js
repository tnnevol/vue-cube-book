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

function getMapJson (url) {
  return axios.get(`http://datavmap-public.oss-cn-hangzhou.aliyuncs.com${url}`)
}

function deepMap (index, name) {
  let p
  let flag = true
  switch (index) {
    case 0:
      p = '/areas/children/'
      break
    case 1:
      p = '/areas/bound/'
      break
    default:
      flag = false
      index = 0
      break
  }

  flag &&
    getMapJson(`${p}${name}`)
      .then((response) => {
        let data = response.data
        fs.writeFile(path.resolve(__dirname, `../public/mapjson/${name}`), JSON.stringify(data), (err) => {
          if (err) throw err
          data.features.forEach((item) => {
            let files = fs.readdirSync(`../public/mapjson/`)
            files.includes(`${item.properties.adcode}.json`) ||
                    deepMap(0, `${item.properties.adcode}.json`)
          })

          fs.writeFile(path.resolve(__dirname, '../log/log.txt'), `${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss:SS')}: 存入${name}文件\n`, {
            flag: 'a'
          }, (err) => {
            if (err) throw err
            console.log(`${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}: 存入${name}文件\n`)
          })
        })
      })
      .catch(() => {
        deepMap(++index, name)
      })
}
// <integer>

deepMap(0, '100000.json')
