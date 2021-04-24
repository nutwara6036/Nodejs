// create API call Book form db.json
const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser')
var mysql = require('mysql');

// database mysql
var database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tools"
});

const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//CORS Middleware
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

database.connect(function(err) {
    try {
        // call books 
        app.get('/books', (request, response) => {
            try {
                let id_items = 1;
                let results;
                let sql = database.format('SELECT * FROM `items` WHERE `id_items` = ? LIMIT 1;', [id_items]);
                database.query(sql, function(error, responseResult) {
                    if (err) {
                        throw err;
                    } else {
                        var send_data = responseResult.recordset;
                        console.log(JSON.stringify(responseResult));
                        response.status(200).json(send_data);
                        console.log(responseResult);
                    }
                });
                // response.status(200).json({ status: "Success", results: JSON.stringify(responseResult) });
                // response.status(200).json({ status: "Success" })
            } catch (error) {
                response.status(400).json({ message: "invalid" })
                response.send(error.message)
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// app.get('/', (request, response) => {
//     Pool.query(sqlCommand1, function(err, result, fields) {
//         //console.log(result);
//         if (err) {
//             throw err
//         }
//         Response.status(200).json(result.rows)
//     });
// });

// // call books by id
// app.get('/books/:id', (req, res) => {
//     res.json(books.find(book => book.id === req.params.id))
// })

// // insert books form x-www-urlencode
// app.post('/books', (req, res) => {
//     books.push(req.body)
//     res.status(201).json(req.body)
// })

// // update books 
// app.put('/books/:id', (req, res) => {
//     const updateIndex = books.findIndex(book => book.id === req.params.id)
//     res.json(Object.assign(books[updateIndex], req.body))
// })

// // delete books 
// app.delete('/books/:id', (req, res) => {
//     const deleteIndex = books.findIndex(book => book.id === req.params.id)
//     books.splice(deleteIndex, 1)
//     res.status(204).send()
// })

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})