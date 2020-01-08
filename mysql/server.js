var port = 3484;
const server = require("socket.io")(port);
var mysql = require('mysql');

// database mysql
var database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cactus"
});


database.connect(function(err) {
    try {

        //alert when connect
        let device_ids_reset;
        server.on("connection", (socket) => {
            console.info(`Client connected [id=${socket.id}]`);

            socket.on("data", (msg) => {
                //console.log(msg);

                // value form device
                let device_id = msg.device_id;
                let humidity = msg.humidity;
                let online_status = msg.online_status;


                // update status when  device online 
                let sqlCommand1 = database.format('UPDATE `humidity` SET `humidity_value` = ? WHERE `device_id` = ?;', [humidity, device_id]);
                database.query(sqlCommand1, function(err, result, fields) {
                    //console.log(result);
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

                // update status when  device online 
                let sqlCommand2 = database.format('UPDATE `device` SET `online_status` = ? WHERE `device_id` = ?;', [online_status, device_id]);
                database.query(sqlCommand2, function(err, result, fields) {
                    //console.log(result);
                    if (err) {
                        console.log(err);
                        return;
                    }
                });

                // select value send to device
                let controls;
                let switchs;
                let checks;
                let sqlCommand3 = database.format('SELECT * FROM `device` WHERE `device_id` = ? LIMIT 1;', [device_id]);
                database.query(sqlCommand3, function(err, results, fields) {

                    console.log(results);

                    controls = results[0].control;
                    switchs = results[0].switch;
                    checks = results[0].humidity_check;

                    if (err) {
                        console.log(err);
                        return;
                    }

                    // socket.emit("auto", { "controls": controls, "check": humidity_checks });
                    socket.emit("auto", controls);
                    socket.emit("switch", switchs);
                    socket.emit("check", checks);

                });

                // when device disconect reset online_status = 0
                device_ids_reset = device_id;

                // Broadcasting
                // socket.emit("topic", { state: "ok" });
            });


            //alert when disconnect
            socket.on("disconnect", () => {
                console.info(`Client Disconnect [id=${socket.id}]`);
                let online_status_reset = 0;
                let sqlCommand2 = database.format('UPDATE `device` SET `online_status` = ? WHERE `device_id` = ?;', [online_status_reset, device_ids_reset]);
                database.query(sqlCommand2, function(err, result, fields) {
                    //console.log(result);
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            });

        });
    } catch (err) {
        console.log(err);
    }
});