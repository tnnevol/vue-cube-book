import { getBook, getChapter } from '@/api/book'
import { setStorage, getStorage } from '@/utils/storage'

const book = {
  namespaced: true,
  state: {
    store: [],
    readingBookId: getStorage('readingBookId'),
    userReadingMark: getStorage('userReadingMark') || {
      flag: 0
    }
  },
  mutations: {
    REFRESH_STORE (state, newValue) {
      state.store = newValue
    },
    LOAD_STORE (state, newValue) {
      state.store = [...state.store, ...newValue]
    },
    SET_READING_BOOK_ID (state, newValue) {
      state.readingBookId = newValue
      setStorage('readingBookId', newValue)
    },

    SET_USER_READING_MARK (state, newValue) {
      state.userReadingMark[state.readingBookId] = {
        chapterNumber: newValue
      }
      // 这个可以让getter触发
      state.userReadingMark.flag++
      setStorage('userReadingMark', state.userReadingMark)
    }
  },
  actions: {
    async getBooks ({ commit }, { type, page = 0, count = 20, doing }) {
      const docs = await getBook(type, page, count)
      const res = docs.data
      const goto = {
        refresh: 'REFRESH_STORE',
        load: 'LOAD_STORE'
      }
      if (res.status === 1) {
        commit(goto[doing], res.data.info.map((book) => {
          return {
            id: book.bookId,
            pic: book.pic,
            name: book.name,
            author: book.author,
            type: book.type,
            status: book.status,
            content: `内容简介：${book.content}`
          }
        }))
      }
    },
    async getChapter ({ commit }, { bookId, chapterNumber }) {
      const docs = await getChapter(bookId, chapterNumber)
      if (docs.data.status === 1) {
        return docs.data.info
      }
    }
  },
  getters: {

  }
}
export default book
