const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/pubilc'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pubilc/index.html');
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/pubilc/page1.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/pubilc/page2.html');
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/pubilc/page3.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



