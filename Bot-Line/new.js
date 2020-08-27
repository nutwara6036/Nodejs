"use strict";
var admin = require("firebase-admin");
// var serviceAccount = require("/xampp/htdocs/Nodejs/Bot-Line/ggez-knmiei-firebase-adminsdk-btpsd-e1e6cab48c.json");

var serviceAccount = require("/xampp/htdocs/Nodejs/Bot-Line/petition-fqrs-firebase-adminsdk-4884g-a6c15544c0.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://ggez-knmiei.firebaseio.com'
    databaseURL: 'https://petition-fqrs.firebaseio.com/'
});


// ox0csbot@gmail.com
// por123456

// TEST 2 
let documentid = 7;
admin.database().ref('documentNU/').on("child_added", function(snapshot) {
    if (snapshot.key == "NU-" + documentid) {
        console.log("NU-" + documentid.toString());
        console.log(snapshot.child("name").val());
        console.log(snapshot.child("meaning").val());
        console.log(snapshot.child("url").val());
        snapshot.child("suggestion").val().split(',').forEach(element => {
            console.log("-" + element);
        });
    }
});

// TEST 1 
let id = "60310192";
admin.database().ref('user/').on("child_added", function(snapshot) {
    if (snapshot.key == id) {
        console.log("รหัสนิสิต:" + snapshot.child("id").val());
        console.log("ชื่อ-นามสกุล :" + snapshot.child("name").val());
        console.log("ชั้นปี :" + snapshot.child("year").val());
        console.log("สาขา :" + snapshot.child("majors").val());
        console.log("อาจารย์ที่ปรึกษา :" + snapshot.child("advisor").val());
        console.log("หัวหน้าภาคสาขาวิชา :" + snapshot.child("headofdepartment").val());
        console.log("คณบดี:" + snapshot.child("dean").val());
    }
});


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