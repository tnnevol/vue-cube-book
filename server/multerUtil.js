const multer = require('multer')

// 磁盘存储引擎 (DiskStorage)
const storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination (req, file, cb) {
    cb(null, './public/uploads')
  },
  // 给上传文件重命名，获取添加后缀名
  filename (req, file, cb) {
    const fileFormat = (file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
module.exports = multer({
  storage: storage
})
