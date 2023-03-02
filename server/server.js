const express = require('express')
const hbs = require('express-handlebars')
const res = require('express/lib/response')

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  dataObj = {
    title: 'the Wisdom of Zoltash',
  }
  res.render('home', dataObj)
})

// Q1 route
server.get('/q1', (req, res) => {
  dataObj = {
    title: 'Question One',
  }
  res.render('home', dataObj) //<----- Change to 'q1'
})

// Fortune route
server.get('/fortune', (req, res) => {
  dataObj = {
    title: 'Here is your fortune',
  }
  res.render('home', dataObj) //<----- Change to 'fortune'
})
// Server.get for the Question two
server.get('/q2', (request, response) => {
  dataObj = {
    title: 'the Wisdom of Zoltash',
  }
  response.render('home', dataObj) //Make sure to change this to Question Two when we have page
})

module.exports = server
