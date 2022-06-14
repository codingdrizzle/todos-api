const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8080

app.use('/api/', bodyParser.json(), routes)
app.use(express.json())



mongoose.connect('mongodb+srv://codingdrizzle:gateway_api${user}@todolist.vczak00.mongodb.net/todoList' || process.env.DATABASE_URL)
        .then(() => console.log('connected to db'))
        .catch((e) => console.error(e))


app.listen(port, () => {console.log(`server has started at port ${port}`)})