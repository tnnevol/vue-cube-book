/**
 * mongodb简介
 * 一般数据库会包括 库 用户 表 字段 value
 * mongodb db user collection(集合) key value
 *
 * @type {Mongoose|*}
 */
const mongoose = require('mongoose')
const db = mongoose.connection
const uri = 'mongodb://127.0.0.1:27017/books'

module.exports = async () => {
  await new Promise((resolve, reject) => {
    mongoose.connect(uri, {
      pass: 'qwer1234',
      user: 'tnnevol',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db.once('open', () => {
      console.log('MongoDB connection ok!')
      resolve()
    })
    db.on('error', (err) => {
      console.error('MongoDB connection fail!')
      reject(err)
    })
  })

// show collections
}
//  Access control is not enabled for the database.
//  Read and write access to data and configuration is unrestricted
// yarn add saslprep
