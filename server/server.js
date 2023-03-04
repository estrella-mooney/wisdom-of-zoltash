const fs = require('node:fs/promises')
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
 let dataObj = {
    title: 'The Wisdom of Zoltash',
  }
  res.render('home', dataObj)
})

// Q1 route
server.get('/q1', (req, res) => {
  let dataObj = {
    title: 'Question One',
  }
  res.render('q1', dataObj)
})

server.post('/q1', (req, res) => {
  const formStuff = req.body
  // const answerOne = formStuff.a1;

  fs.readFile(__dirname + '/data/data.json', 'utf-8')
  .then((result) => {

    // get the parsed json data
    const parsedResult = JSON.parse(result)
    // console.log(parsedResult)

    // find all fortuneResult2
    const fortunes = parsedResult.fortunes
    // console.log(theOne)

    // update each objects fortuneResult2 property
    fortunes.forEach((fortune) => {
      fortune.fortuneResult2 = formStuff.a1
    })

    //change the json data so its readable, and align back to object
    const stringResult = JSON.stringify(parsedResult, null, 2)
    // console.log(stringResult)

    //rewrite the file
    return fs.writeFile(__dirname + '/data/data.json', stringResult)
  })

  .then(() => {
    res.redirect('fortune')
  })

  .catch((err) => {
    res.status(500).send(err.message)
  })

})



server.get('/fortune', (req, res) => {
  fs.readFile(__dirname + '/data/data.json', 'utf-8')
  .then((answer) => {
    let thing = JSON.parse(answer)
    let randomIndex = Math.floor(Math.random() * thing.fortunes.length)
    let fortuneAnswer = {
      title: 'Fortune Time',
      fortune: thing.fortunes[randomIndex] 
    }
    res.render('fortune', fortuneAnswer)
  })

  .catch((err) => {
    res.status(500).send(err.message)
  })
})

module.exports = server
