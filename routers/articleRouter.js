const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get('/', articleController.welcomePage)

// | /api/article     | POST    | {json}            | post a new article |
router.post('/article/', articleController.postArticle)

// | /api/articles/    | GET     | -                 | get all article    |
router.get('/article/', articleController.getArticles)

// | /api/article/:id | GET     | params.id         | get article by id  |
router.get('/article/:id', articleController.getArticle)

// | /api/article/:id | PUT     | params.id, {json} | edit an article    |
router.put('/article/:id', articleController.editArticle)

// | /api/article/:id | DELETE  | params.id         | delete an article  |
router.delete('/article/:id', articleController.deleteArticle)

module.exports = router;
