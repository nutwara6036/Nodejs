const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM5', {
    baudRate: 9600
})
var robot = require("robotjs");


const parser = new Readline()
port.pipe(parser)
let state = 0;
parser.on('data', data => trig(data))

function trig(params) {
    console.log(params);
    if (params == 0) {
        if (state == 0) {
            robot.keyTap("z");
            console.log("???");
            state = 1;
        } else if (state == 2) {
            robot.keyTap("z");
            robot.keyTap("x");
            state = 0;
        } else {
            robot.keyTap("x");
            console.log("???");
            state = 2;
        }

    }
}