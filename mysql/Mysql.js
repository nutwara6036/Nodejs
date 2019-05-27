var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

// set file 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bme_weather"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM data WHERE temperature";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        io.on('connection', function (socket) {
            console.log('a user connected');
            // alert connect 
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
            // read message 
            socket.on('chat message', function (msg) {
                console.log('message: ' + msg);
            });
            // Broadcasting
            socket.on('chat message', function (msg) {
                io.emit('chat message', msg);
            });
        });
    });


});

http.listen(3000, function () {
    console.log('listening on *:3000');
});