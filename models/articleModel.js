const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: String,
  author: String,
  imageHeader: String,
  category: [String],
  // category: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Catagory'
  // }],
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const articleModel = mongoose.model('Article', articleSchema)

module.exports = articleModel
