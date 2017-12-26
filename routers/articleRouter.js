const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get('/', articleController.welcomePage)

// | /api/article     | POST    | {json}            | post a new article |
router.post('/article/', articleController.postArticle)

// | /api/articles     | POST    | [{json},{json}]  | post a bunch new articles |
router.post('/articles/', articleController.postArticles)

// | /api/articles/    | GET     | -                 | get all article   |
router.get('/article/', articleController.getArticles)

// | /api/article/:id | GET     | params.id         | get article by id  |
router.get('/article/:id', articleController.getArticle)

// | /api/article/:id | PUT     | params.id, {json} | edit an article    |
router.put('/article/:id', articleController.editArticle)

// | /api/article/:id | DELETE  | params.id         | delete an article  |
router.delete('/article/:id', articleController.deleteArticle)

// | /api/latest      | GET     | -                 | get latest 10      |
router.get('/latest/', articleController.latest)

// | /api/latest/:page | GET    | params.page |  get page, 10 articles/page |
router.get('/latest/:page', articleController.latestPaging)

// | /api/category/:category | GET | params.category | get article by category latest 10 |
router.get('/category/:category', articleController.category)

// | /api/category/:category/:page | GET | params.category, params.page | get article by category, 10 articles/page |
router.get('/category/:category/:page', articleController.categoryPaging)

// | /api/search?keyword= | GET | query.keyword | search by title 10 articles/page |
// | /api/search?keyword=XXX&page=YY | GET | query.keyword, query.page | search by title   |
router.get('/search', articleController.search)

module.exports = router;
