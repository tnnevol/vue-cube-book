import request from '@/utils/request'

/**
 * 获取书籍
 * getBook
 * @param type
 * @param page
 * @param count
 */
export const getBook = (type, page, count) => {
  return request({
    url: '/tnnevol/books/',
    params: {
      type,
      page,
      count
    },
    method: 'get'
  })
}
export const getChapter = (bookId, chapterNumber) => {
  return request({
    url: '/tnnevol/books/getChapter/',
    params: {
      bookId,
      chapterNumber
    },
    method: 'get'
  })
}
