const Article = require('../models/articleModel')

const welcomePage = (req, res) => {
  res.json({
    status: 'ok',
    apiVer: '1.0.0'
  })
}

const postArticle = async (req, res) => {
  try {
    const article = new Article(req.body)
    const saveArticle = await article.save()
    res.json({
      status: 'OK',
      newArticle: saveArticle
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot post article',
      msg: err
    })
  }
}

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.json({
      status: 'OK',
      articles: articles
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot get all articles',
      msg: err
    })
  }
}

const getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id })
    res.json({
      status: 'OK',
      article: article
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot get article by ID ' + req.params.id,
      msg: err
    })
  }
}

const editArticle = async (req, res) => {
  try {
    const before = await Article.findOne({ _id: req.params.id })
    const statusEdit = await Article.update({ _id: req.params.id }, req.body)
    req.body._id = req.params.id
    res.json({
      status: statusEdit,
      articleBefore: before,
      artcileAfter: req.body
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot edit article ID ' + req.params.id,
      msg: err
    })
  }
}

const deleteArticle = async (req, res) => {
  try {
    const before = await Article.findOne({ _id: req.params.id })
    const statusDelete = await Article.remove({ _id: req.params.id })
    res.json({
      status: statusDelete,
      articleBefore: before
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot delete article ID ' + req.params.id,
      msg: err
    })
  }
}

const latest = async (req, res) => {
  try {
    const articles = await Article
      .find()
      .sort({ createdAt: 'desc' })
      .limit(10)
    res.json({
      status: 'OK',
      articles: articles
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot get latest',
      msg: err
    })
  }
}

const latestPaging = async (req, res) => {
  try {
    const page = (+req.params.page - 1) * 10
    const articles = await Article
      .find()
      .sort({ createdAt: 'desc' })
      .limit(10)
      .skip(page)
    res.json({
      status: 'OK',
      articles: articles
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot get page' + req.params.page,
      msg: err
    })
  }
}

module.exports = {
  welcomePage,
  postArticle,
  getArticles,
  getArticle,
  editArticle,
  deleteArticle,
  latest,
  latestPaging
};
