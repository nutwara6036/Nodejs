var port = 8000;
const server = require("./node_modules/socket.io")(port);
var keyboard = require('./node_modules/node-key-sender');
let check = false;
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.on("topic", (msg) => {
        console.log(msg);
        let time = new Date();
        if (msg.Log === '1') {
            console.log(time.toLocaleTimeString() + " : 1");
            //keyboard.sendKey('a');
            check = true;
        }
        if (msg.Log === "2") {
            console.log(time.toLocaleTimeString() + " : 2");
            //keyboard.sendKey();
            check = true;

        }
        if (msg.Log === "3") {
            console.log(time.toLocaleTimeString() + " : 3");
            //keyboard.sendKey();
            check = true;
        }
        if (check) {
            socket.emit("topic", { Log: "success" });

        }
    });

    // Ex. Sending side(package from server)
    // socket.emit("EVENT_NAME", { "ATTRIBUTE_OF_OBJ" : SOMETHING });
    //socket.emit("topic", { Log: "success" });

    socket.on("disconnect", () => {
        console.info(`Client Disconnect [id=${socket.id}]`);
    });

});