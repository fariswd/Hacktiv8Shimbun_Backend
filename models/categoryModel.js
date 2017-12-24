const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  category: String
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel
