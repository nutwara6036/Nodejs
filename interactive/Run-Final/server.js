var port = 3484;
const server = require("socket.io")(port);
var keyboard = require('node-key-sender');
let check = false;
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.on("topic", (msg) => {
        //console.log(msg);
        console.log(msg.message);
        let time = new Date();
        if (msg.message === "1") {
            console.log(time.toLocaleTimeString() + " : 1");
            keyboard.sendKey('');
        }
        if (msg.message === "2") {
            console.log(time.toLocaleTimeString() + " : 2");
            keyboard.sendKey('');
        }
        if (msg.message === "3") {
            console.log(time.toLocaleTimeString() + " : 3");
            keyboard.sendKey('');
        }
        if (msg.message === "4") {
            console.log(time.toLocaleTimeString() + " : 4");
            keyboard.sendKey('');
        }
        if (msg.message === "5") {
            console.log(time.toLocaleTimeString() + " : 5");
            keyboard.sendKey('');
        }
        if (msg.message === "6") {
            console.log(time.toLocaleTimeString() + " : 6");
            keyboard.sendKey('');
        }
        socket.emit("topic", { accept: "sync" });
    });

    // Ex. Sending side(package from server)
    // socket.emit("EVENT_NAME", { "ATTRIBUTE_OF_OBJ" : SOMETHING });
    //socket.emit("topic", { Log: "success" });

    socket.on("disconnect", () => {
        console.info(`Client Disconnect [id=${socket.id}]`);
    });

});