const getters = {
  // book
  store: state => state.book.store,
  readingBookId: state => state.book.readingBookId,
  readingChapterNumber: state => {
    const userReadingMark = state.book.userReadingMark
    const readingBookId = state.book.readingBookId
    const readingBook = userReadingMark[readingBookId]
    console.log(userReadingMark.flag)
    return readingBook ? readingBook.chapterNumber : 0
  }
}

export default getters
