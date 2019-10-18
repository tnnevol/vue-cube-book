const express = require('express')
const Blog = require('../model/blog')
const router = express.Router()
/* GET home page. */
router.get('/', function (req, res, next) {
  const mongoTitle = new Blog({
    title: 'hello MongoDB',
    author: 'newblue',
    body: ''
  })
  const isSave = false
  if (isSave) {
    mongoTitle.save(() => {
      console.log('success save')
    })
  } else {
    Blog.remove(() => {
      console.log('success remove')
    })
  }

  Blog.find((err, blogRes) => {
    console.dir(blogRes)
    res.render('index', {
      title: 'Blog',
      content: blogRes
    })
  })
})

module.exports = router
