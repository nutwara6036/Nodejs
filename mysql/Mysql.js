var app = require('express')();
var http = require('http').Server(app);
var server = require('socket.io')(http);
var mysql = require('mysql');
var port = 3000;

// set file 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


var database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bme_weather"
});


database.connect(function(err) {
    try {
        //alert when connect
        server.on('connection', function(socket) {
            console.info(`Client connected [id=${socket.id}]`);
            // read message 
            socket.on('chat message', function(msg) {
                console.log('message read: ' + msg);
                let temperature = msg;
                let pressure = msg;
                let approx = msg;
                let humidity = msg;
                let sqlCommand = database.format('INSERT INTO `data`(`temperature`, `pressure`, `approx`, `humidity`) VALUES (?, ?, ?, ?)', [temperature, pressure, approx, humidity]);

                database.query(sqlCommand, function(err, result, fields) {
                    console.log(result);
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

                // let sqlCommands = "SELECT * FROM data WHERE temperature";
                // database.query(sqlCommands, function(err, result, fields) {
                //     console.log(result);
                //     //if (err) throw err;
                //     if (err) {
                //         console.log(err);
                //         return;
                //     }
                // });
            });
            // Broadcasting
            socket.on('chat message', function(msg) {
                server.emit('chat message', msg);
            });
        });
        //alert when disconnect
        server.on("disconnect", () => {
            console.info(`Client Disconnect [id=${socket.id}]`);
        });
    } catch (err) {
        console.log(err);
    }
});
http.listen(port, function() {
    console.info(`listening on *:${port}`);
});