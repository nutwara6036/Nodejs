// const midi = require('midi');
const request = require('request');
var keypress = require('keypress');

// const parser = new Readline()
// port.pipe(parser)
// parser.on('data', line => console.log(> ${line}))
// make process.stdin begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    if (key) {
        // console.log(key.name);
        key_press(key.name);
    }
    if (key && key.ctrl && key.name == 'c') {
        process.exit()
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();
// Set up a new input.
//const input = new midi.Input();
// Configure a callback.
let kuy;

// Create a virtual input port.
// input.openVirtualPort("HTTP Midi");
// // console.log("Visual midi is Open Name : HTTP Midi")
// input.on('message', (deltaTime, message) => {
//     // console.log(m: ${message} d: ${deltaTime});
//     message_selection(message);
// });

function message_selection(message) {
    if (message[0] == 144) {
        console.log("Note on : " + message[1]);
        // port.write('10\n');
        light_interface(message[1]);
    }
}

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

function key_press(key) {
    switch (key) {
        case "q":
            light_interface(1);
            break;
        case "w":
            light_interface(2);
            break;
        case "e":
            light_interface(3);
            break;
        case "r":
            light_interface(4);
            break;
        case "t":
            light_interface(5);
            break;
        case "y":
            light_interface(6);
            break;
        case "u":
            light_interface(7);
            break;
        case "i":
            light_interface(8);
            break;
        case "o":
            light_interface(9);
            break;
        case "p":
            light_interface(10);
            break;
        case "a":
            light_interface(11);
            break;
        case "s":
            light_interface(12);
            break;
        case "d":
            light_interface(13);
            break;
        case "f":
            light_interface(14);
            break;
        case "g":
            light_interface(15);
            break;
        case "h":
            light_interface(16);
            break;
        default:
            break;
    }
}

function light_interface(index) {
    let path;
    switch (index) {
        case 1:
            path = "01";
            break;
        case 2:
            path = "11";
            break;
        case 3:
            path = "02";
            break;
        case 4:
            path = "12";
            break;
        case 5:
            path = "03";
            break;
        case 6:
            path = "13";
            break;
        case 7:
            path = "04";
            break;
        case 8:
            path = "14";
            break;
        case 9:
            path = "05";
            break;
        case 10:
            path = "15";
            break;
        case 11:
            path = "06";
            break;
        case 12:
            path = "16";
            break;
        case 13:
            path = "07";
            break;
        case 14:
            path = "17";
            break;
        case 15:
            path = "08";
            break;
        case 16:
            path = "18";
            break;
        default:
            break;
    }

    //call_api("http://127.0.0.1:3000/" + path);
    call_api("http://192.168.1.99/1234/6/?" + path + "&");
}

// Close the port when done.
// input.closePort();



// เปิดไฟช่อง 1
// http://192.168.1.99/1234/6/?01&

// ปิดไฟช่อง 1
// http://192.168.1.99/1234/6/?11&

// เปิดไฟช่อง 2
// http://192.168.1.99/1234/6/?02&

// ปิดไฟช่อง 2
// http://192.168.1.99/1234/6/?12&

// เปิดไฟช่อง 3
// http://192.168.1.99/1234/6/?03&

// ปิดไฟช่อง 3
// http://192.168.1.99/1234/6/?13&

// เปิดไฟช่อง 4
// http://192.168.1.99/1234/6/?04&

// ปิดไฟช่อง 4
// http://192.168.1.99/1234/6/?14&

// เปิดไฟช่อง 5
// http://192.168.1.99/1234/6/?05&

// ปิดไฟช่อง 5
// http://192.168.1.99/1234/6/?15&

// เปิดไฟช่อง 6
// http://192.168.1.99/1234/6/?06&

// ปิดไฟช่อง 6
// http://192.168.1.99/1234/6/?16&

// เปิดไฟช่อง 7
// http://192.168.1.99/1234/6/?07&

// ปิดไฟช่อง 7
// http://192.168.1.99/1234/6/?17&

// เปิดไฟช่อง 8
// http://192.168.1.99/1234/6/?08&

// ปิดไฟช่อง 8
// http://192.168.1.99/1234/6/?18&