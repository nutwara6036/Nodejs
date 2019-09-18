var port = 8000;
const client = require("socket.io-client");
var socket = client.connect('http://localhost:' + port);


setInterval(() => {
    socket.emit("topic", { Log: "1" });
}, 1000);

socket.on("topic", function(data) {
    console.log(data.Log);
});