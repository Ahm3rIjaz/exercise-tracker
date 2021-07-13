const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const exerciseRouter = require('./controllers/exercises')

const app = express()

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/api/users', userRouter)
app.use('/api/users', exerciseRouter)

module.exports = app