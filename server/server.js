const express = require('express')
const hbs = require('express-handlebars')
const res = require('express/lib/response')
//Estrella stuff
const fs = require('node:fs/promises')
const fileData = __dirname + '/data/data.json'
//Estrella ^^^^

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
    title: 'The Wisdom of Zoltash',
  }
  res.render('home', dataObj)
})

// Q1 route
server.get('/q1', (req, res) => {
  dataObj = {
    title: 'Question One',
  }
  res.render('q1', dataObj) //<----- Change to 'q1'
})

// Server.get for the Question two
server.get('/q2', (request, response) => {
  dataObj = {
    title: 'Question Two',
  }
  response.render('q2', dataObj) //Make sure to change this to Question Two when we have page
})

//Estrella CHANGES ------->
server.post('/q2', (req, res) => {
  console.log(req.body)
  console.log(fileData)
  res.redirect('/fortune')
})

// Fortune route
server.get('/fortune', (req, res) => {
  dataObj = {
    title: 'Here is your fortune',
  }
  res.render('fortune', dataObj) //<----- Change to 'fortune'
})

module.exports = server
