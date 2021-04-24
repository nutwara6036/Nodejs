// create API call Book form db.json
const express = require('express')
const bodyParser = require('body-parser')
const books = require('./dbbook')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// call books 
app.get('/books', (req, res) => {
    res.json(books)
})

// call books by id
app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
})

// insert books form x-www-urlencode
app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(201).json(req.body)
})

// update books 
app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(books[updateIndex], req.body))
})

// delete books 
app.delete('/books/:id', (req, res) => {
    const deleteIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deleteIndex, 1)
    res.status(204).send()
})

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})