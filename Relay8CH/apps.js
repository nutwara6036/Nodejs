var app = require('express')();
var http = require('http').createServer(app);
const request = require('request');
//const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
// const port = new SerialPort("/dev/tty.usbmodem144301", {
//     baudRate: 115200
// })

app.get('/:id', function(req, res) {
    console.log(req.params);

    // console.log('listening on *:3000');
    //port.write(req.params.id + '\n');
    call_api("http://192.168.1.99/1234/6/?" + req.params.id + "&");
    res.send('<h1>Hello world</h1>');
});



http.listen(3000, function() {
    console.log('listening on *:3000');
});

function call_api(url) {
    request(url, {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log("> Call " + url);
    });
}