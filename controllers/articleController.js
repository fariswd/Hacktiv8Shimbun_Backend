const Article = require('../models/articleModel')
const LatestVersion = require('../models/articleVersionModel')

//versionHelper.updateVersion()
const versionHelper = require('../helpers/getVersion')

const welcomePage = (req, res) => {
  res.json({
    status: 'ok',
    apiVer: '1.0.0 cached'
  })
}

const postArticle = async (req, res) => {
  try {
    const article = new Article(req.body)
    const saveArticle = await article.save()
    const updateVersion = await versionHelper.updateVersion()
    res.json({
      status: 'OK',
      version: updateVersion,
      newArticle: saveArticle
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot post article',
      msg: err
    })
  }
}

const postArticles = async (req, res) => {
  try {
    // res.json(req.body.articles)
    // const article = new Article(req.body)
    const saveArticle = await Article.insertMany(req.body.articles)
    const updateVersion = await versionHelper.updateVersion()
    res.json({
      status: 'OK',
      version: updateVersion,
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
    const updateVersion = await versionHelper.updateVersion()
    req.body._id = req.params.id
    res.json({
      status: statusEdit,
      version: updateVersion,
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
    const updateVersion = await versionHelper.updateVersion()
    res.json({
      status: statusDelete,
      version: updateVersion,
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
    const status = await versionHelper.checkVersion(req.params.page)
    if(status){
      let articles = versionHelper.getCache('latest')
      articles.then(result => {
        res.json({
          status: 'OK',
          articles: JSON.parse(result[0]),
          cache: 'OK'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'cannot get cached latest',
          msg: err
        })
      })
    } else {
      //else get atlas, set redis(latest)...latestPage2...latestPage3
      const articles = await Article
      .find()
      .sort({ createdAt: 'desc' })
      .limit(10)
      const setCache = versionHelper.setCache('latest', articles)
      if(setCache) {
        res.json({
          status: 'OK',
          articles: articles,
          cache: 'OK'
        })
      } else {
        res.json({
          status: 'OK',
          articles: articles,
          cache: 'cannot cached'
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 'cannot get latest',
      msg: err
    })
  }
}

const latestPaging = async (req, res) => {
  try {
    const status = await versionHelper.checkVersion(req.params.page)
    if(status){
      let articles = versionHelper.getCache('latest' + req.params.page)
      articles.then(result => {
        res.json({
          status: 'OK',
          articles: JSON.parse(result[0]),
          cache: 'OK'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'cannot get cached latest',
          msg: err
        })
      })
    } else {
      //else get atlas, set redis(latest)...latestPage2...latestPage3
      const page = (+req.params.page - 1) * 10
      const articles = await Article
      .find()
      .sort({ createdAt: 'desc' })
      .limit(10)
      .skip(page)
      const setCache = versionHelper.setCache('latest' + req.params.page, articles)
      if(setCache) {
        res.json({
          status: 'OK',
          page: req.params.page,
          articles: articles,
          cache: 'OK'
        })
      } else {
        res.json({
          status: 'OK',
          page: req.params.page,
          articles: articles,
          cache: 'cannot cached'
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 'cannot get page' + req.params.page,
      msg: err
    })
  }
}

const category = async (req, res) => {
  try {
    const articles = await Article
      .find({ category: { $in: [req.params.category] }})
      .sort({ createdAt: 'desc' })
      .limit(10)
    res.json({
      status: 'OK',
      articles: articles
    })
  } catch (err) {
    res.status(500).json({
      status: 'cannot get catagory of ' + req.params.category,
      msg: err
    })
  }
}

const categoryPaging = async (req, res) => {
  try {
    const page = (+req.params.page - 1) * 10
    const articles = await Article
      .find({ category: { $in: [req.params.category] }})
      .sort({ createdAt: 'desc' })
      .limit(10)
      .skip(page)
    res.json({
      status: 'OK',
      page: req.params.page,
      articles: articles
    })
  } catch (err) {
    res.status(500).json({
      status: `cannot get catagory of ${req.params.category} on page ${req.params.page}`,
      msg: err
    })
  }
}

const search = async (req, res) => {
  if (req.query.page) {
    try {
      const page = (+req.query.page - 1) * 10
      const articles = await Article
        .find({ $text: { $search: req.query.keyword } })
        .sort({ createdAt: 'desc' })
        .limit(10)
        .skip(page)
      res.json({
        status: 'OK',
        page: req.query.page,
        articles: articles
      })
    } catch (err) {
      res.status(500).json({
        status: `cannot search '${req.query.keyword}', on page ${req.query.page}`,
        msg: err
      })
    }
  } else {
    try {
      const articles = await Article
        .find({ $text: {$search: req.query.keyword} })
        .sort({ createdAt: 'desc' })
        .limit(10)
      res.json({
        status: 'OK',
        page: req.query.page,
        articles: articles
      })
    } catch (err) {
      res.status(500).json({
        status: `cannot search '${req.query.keyword}'`,
        msg: err
      })
    }
  }
}

const getVer = async (req, res) => {
  try {
    const version = await LatestVersion.find()
    if(version.length == 0){
      const latestVersion = new LatestVersion({ version: 0 })
      const newVersion = await latestVersion.save()
      res.send({
        status: 'OK',
        version: -1,
        forYou: 'no version created, let me create for you, here you go',
        msg: newVersion
      })
    } else {
      res.send({
        status: 'OK',
        version: version[0].version
      })
    }
  } catch (err) {
    res.status(500).send({
      status: 'cannot get version',
      msg: err
    })
  }
}

module.exports = {
  welcomePage,
  postArticle,
  postArticles,
  getArticles,
  getArticle,
  editArticle,
  deleteArticle,
  latest,
  latestPaging,
  category,
  categoryPaging,
  search,
  getVer
};
