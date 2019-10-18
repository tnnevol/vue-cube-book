var fs = require('fs')
var request = require('request')

function createPics ({
  url, index = 1, num = 100, suffix = 'jpg', path = '../public/images/', fileName = 'meinv'
} = {}) {
  for (var i = index; i <= num; i++) {
    var src = `${url}/31b${i > 9 ? i : '0' + i}.${suffix}`
    console.log(src)
    var writeStream = fs.createWriteStream(`${path}/${fileName}/31b${i > 9 ? i : '0' + i}.${suffix}`)
    var readStream = request(src)
    readStream.pipe(writeStream)
    readStream.on('end', function () {
      console.log('文件下载成功')
    })
    readStream.on('error', function () {
      console.log('错误信息:' + err)
    })
    writeStream.on('finish', function () {
      console.log('文件写入成功')
      writeStream.end()
    })
  }
}

createPics({
  url: 'https://i.meizitu.net/2019/05',
  index: 1,
  num: 48
})
