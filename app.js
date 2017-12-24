const app = require('express')()
const mongoose = require('mongoose').connect('mongodb://localhost:27017/hacktiv8shimbun')
const morgan = require('morgan')
const articleRouter = require('./routers/articleRouter')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    status: "ok"
  })
})

app.use('/api/', articleRouter)

app.listen(3000, () => console.log('running on port 3000'))
