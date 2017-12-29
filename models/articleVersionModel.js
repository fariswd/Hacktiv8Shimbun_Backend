const mongoose = require('mongoose')

const versionSchema = mongoose.Schema({
  version: Number
})

const versionModel = mongoose.model('ArticleVersion', versionSchema)

module.exports = versionModel
