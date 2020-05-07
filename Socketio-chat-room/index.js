var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set file 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

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



http.listen(3000, function () {
  console.log('listening on *:3000');
});