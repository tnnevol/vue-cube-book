const getPage = async ({ model, type, count, page }) => {
  return model.find({ type }, { chapterList: 0, __v: 0, _id: 0 })
    .sort({ id: 1 })
    .limit(count)
    .skip(page)
    .exec()
}
const modelCount = async (model) => {
  return model.countDocuments() // count 即将废弃尽量不要使用
    .exec()
}

module.exports = {
  getPage,
  modelCount
}
