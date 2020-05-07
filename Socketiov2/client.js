var port = 3484;
const client = require("socket.io-client");
var socket = client.connect('http://localhost:' + port, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
});


setInterval(() => {
    socket.emit("topic", { "message": "1" });
}, 1000);

socket.on("topic", function(data) {
    console.log(data.Log);
});