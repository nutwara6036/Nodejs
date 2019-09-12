var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
    console.log(req.params.id);
})

http.listen(80, function() {
    console.log('listening on *:80');
});