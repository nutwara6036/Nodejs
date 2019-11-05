var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
var port = 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Do not expose internal modules path to your websites. Transform!
app.use('/scripts', express.static(__dirname + '/node_modules/highcharts/'));
app.use('/scripts1', express.static(__dirname + '/node_modules/highcharts/themes/'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);

    })
});
//{"machine":{"temperature":100.810507137356563},"timeCreated":"2019-11-06T23:55:56.1058921Z"}

http.listen(port, () => console.log(`Example app listening on port ${port}!`))