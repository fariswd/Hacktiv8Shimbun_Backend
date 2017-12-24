const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get('/', articleController.welcomePage)

module.exports = router;
