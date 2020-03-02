"use strict";
var admin = require("firebase-admin");


var serviceAccount = require("/xampp/htdocs/ggez-knmiei-firebase-adminsdk-btpsd-a3753ab912.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ggez-knmiei.firebaseio.com"
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
admin.database().ref("room").once("value", snapshot => {
    console.log(snapshot.child("room1").child("led1").val());
});
let led = 1;
let result = "led";
if (result) {
    result += led.toString();
    console.log(result);
}
admin.database().ref("room").child("room1").update({ "led1": 0 }).then(_ => {
    console.log("dd");
});

// admin.database().ref("room").once("value", snapshot => {
//     console.log(snapshot.child("room1").child("led1").val());
// });

// admin.database().ref("/room/room1/").update({ led1: 0 }).then(snapshot => {
//     console.log(snapshot.val());
// });


// //ex
// // {
// //     "room": {
// //         "room1": {
// //             "led1": 0,
// //             "led2": 0
// //         },
// //         "room2": {
// //             "led1": 1,
// //             "led2": 1
// //         }
// //     }
// // }

// // // Test for the existence of certain keys within a DataSnapshot
// var ref = admin.database().ref("room");
// ref.once("value").then(function(snapshot) {
//     var name = snapshot.child("room1").val(); // {led1:"0",led2:"0"}
//     console.log(name);
//     var led1 = snapshot.child("room1/led1").val(); // "0"
//     console.log(led1);
//     var led2 = snapshot.child("room1").child("led2").val(); // "0"
//     console.log(led2);

// });



// // {
// //   "users": {
// //     "ada": {
// //       "first": "Ada",
// //       "last": "Lovelace"
// //     },
// //     "alan": {
// //       "first": "Alan",
// //       "last": "Turing"
// //     }
// //   }
// // }

// // Loop through users in order with the forEach() method. The callback
// // provided to forEach() will be called synchronously with a DataSnapshot
// // for each child:
// var query = admin.database().ref("room").orderByKey();
// query.once("value").then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         // key will be "ada" the first time and "alan" the second time
//         var key = childSnapshot.key;
//         console.log(key);
//         // childData will be the actual contents of the child
//         var childData = childSnapshot.val();
//         console.log(childData);

//     });
// });