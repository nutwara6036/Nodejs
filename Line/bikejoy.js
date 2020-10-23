"use strict";
var admin = require("firebase-admin");


var serviceAccount = require("/xampp/htdocs/Nodejs/Line/bikejoys-783e6-firebase-adminsdk-5csh3-3a9caf10e8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bikejoys-783e6.firebaseio.com/'
});


// admin.database().ref('shops').once('value', snap => {
//     // do something with the user data
//     console.log(snap.key);
//     console.log(snap.val());
// });

// admin.database().ref('shops/-MKKVa09RyNkUpp6ft-S/').orderByKey().once('value', snap => {
//     // do something with the user data
//     console.log(snap.key);
//     console.log(snap.val());
//     console.log(snap.child("address").val());
// });


// admin.database().ref("shops").push({
//     address: "สีหราชเดโชชัย, ภายในปั้มปตท สีหราช ชั้น2อาคารติ่มซำ, Wat Chan, เมืองพิษณุโลก, Phitsanulok 65000",
//     distance: 9.310126594742261,
//     img: "https://cms.dmpcdn.com/travel/2020/02/01/2c727f20-44d7-11ea-ae38-73538266b6f9_original.jpg",
//     location: {
//         lat: 16.8217511,
//         lng: 100.2344875
//     },
//     name: "วัดศรีชุม",
//     open: {
//         day: "ทุกวัน",
//         time: "10:00 - 12:00"
//     },
//     shopkey: "key",
//     star: {
//         point: 53,
//         visiter: 11
//     },
//     tel: "055 000 114"
// }).then(_ => {
//     console.log("OK");
// });

// admin.database().ref("shops/-MKKXJrJh814wMqAIO6Y").update({ tel: 1234 });

// admin.database().ref("shops").remove().then(_ => {
//     console.log("OK");
// });

// let name = "วัดศรีชุม";
// admin.database().ref("shops/-MKKXJrJh814wMqAIO6Y").orderByKey().startAt(name).endAt(name + "\uf8ff").on("child_added", snapshot => {
//     console.log(snapshot.key);
//     console.log(snapshot.val());
// });