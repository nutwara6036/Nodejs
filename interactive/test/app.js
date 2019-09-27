var util = require('util');
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var keyboard = require('node-key-sender');
app.listen(3484);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

function reset() {
    io.sockets.emit('reset', { message: "reset" });
}

function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

function sendaccept() {
    io.sockets.emit('topic', { accept: "sucess" })
}
io.on('connection', function(socket) {
    console.log("Connected");
    socket.emit('welcome', { message: 'Connected !!!!' });
    socket.on('connection', function(data) {
        console.log(data);
    });
    socket.on('topic', function(data) {
        sendaccept();
        //console.log(data.message);
        let time = new Date();
        if (data.message === '1') {
            console.log(time.toLocaleTimeString() + " : 1");
            //keyboard.sendKey('a');
            check = true;
        }
        if (data.message === "2") {
            console.log(time.toLocaleTimeString() + " : 2");
            //keyboard.sendKey();
            check = true;

        }
        if (data.message === "3") {
            console.log(time.toLocaleTimeString() + " : 3");
            //keyboard.sendKey();
            check = true;
        }
    });
    socket.on('web', function(data) {
        console.log("receive:" + data);
        reset();
        sendTime();
    });
});