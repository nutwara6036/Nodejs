"use strict";
var admin = require("firebase-admin");
var serviceAccount = require("/xampp/htdocs/Nodejs/Bot-Line/ggez-knmiei-firebase-adminsdk-btpsd-e1e6cab48c.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ggez-knmiei.firebaseio.com'
});


// admin.database().ref("menu/ขนม/hellox").set(0);

// admin.database().ref("users").push({ name: randomIndex });

// admin.database().ref('users').limitToFirst(randomIndex).limitToLast(0).once('value', snapshot => {
//     console.log(snapshot.val());
//     // do something with the user data
// });

// admin.database().ref('users/').orderByKey().once('value', snapshot => {
//     console.log(snapshot.val());
//     // console.log(snapshot.child("age").val());
//     for (let index = 0; index < snapshot.numChildren(); index++) {
//         console.log(Object.keys(snapshot.val())[index].toString() + "-" + snapshot.child(Object.keys(snapshot.val())[index]).val().toString());
//     }

// });

// admin.database().ref('users/').once('value', snapshot => {
//     console.log(snapshot.val());
// });


var db = admin.database();
var ref = db.ref("users");
ref.orderByChild("name").on("child_added", function(snapshot) {
    console.log(snapshot.key + " was " + snapshot.val().name + " meters tall");
});


// let id = "57363795";

// admin.database().ref('users/').on("child_added", function(snapshot, keys) {
//     // console.log("Previous Post ID: " + snapshot.key);
//     console.log(snapshot.val());
//     if (snapshot.key == id) {
//         console.log(snapshot.val());
//         console.log("รหัสนิสิต:" + snapshot.child("id").val());
//         console.log("ชิ่อ:" + snapshot.child("name").val());
//         console.log("ที่ปรึกษา:" + snapshot.child("advisor").val());
//     }
// });


// let numberOfUsers = 2;
// let randomIndex = Math.floor(Math.random() * numberOfUsers);
// console.log(randomIndex);
// let bmr = 1590;
// // save user
// admin.database().ref("users").push({
//     name: "name",
//     gender: "gender",
//     age: "age",
//     weight: "weight",
//     height: "height",
//     bloodtype: "bloodtype",
//     congenitaldisease: "congenitaldisease",
//     foodallergy: "foodallergy",
//     bmi: "bmi",
//     bmr: "bmr"
// }).then(_ => {
//     // randomIndex
//     let numberOfUsers = 2;
//     return admin.database().ref('random-menu/' + Math.floor(Math.random() * numberOfUsers)).orderByKey().once('value', snapshot => {
//         if (snapshot.child("cal").val() <= bmr) {
//             for (let index = 0; index < snapshot.numChildren(); index++) {
//                 console.log(`ประเภท ` + Object.keys(snapshot.val())[index].toString() + ` : ` + snapshot.child(Object.keys(snapshot.val())[index]).val().toString());
//             }
//         }
//     });
// });