const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM8', {
    baudRate: 9600
})

var ks = require('node-key-sender');

const parser = new Readline()
port.pipe(parser)
parser.on('data', data => trig(data))

function trig(params) {
    console.log(params);
    if (params == 0) {
        ks.sendKey('a');

    } else if (params == 1) {
        ks.sendKey('a');

    } else if (params == 2) {
        ks.sendKey('a');
    }
}