const fs = require('fs')

// 存储文件
const save2File = async (content, path, fileName) => {
  // 创建文件目录
  await new Promise((resolve, reject) => {
    fs.mkdir(path.join(__dirname, `../${path}`), () => {
      const writeStream = fs.createWriteStream(path.join(__dirname, `../${path}${fileName}`))
      writeStream.on('open', () => {
        console.log('打开')
      })
      writeStream.on('ready', () => {
        console.log('开始')
        writeStream.write(JSON.stringify(content))
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
  return `${fileName}${fileName}`
}

module.exports = save2File
