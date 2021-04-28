"use strict";
var admin = require("firebase-admin");
var serviceAccount = require("/xampp/htdocs/Nodejs/cp1/db-ionics-tester-firebase-adminsdk-slkyp-9cc694311c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://db-ionics-tester.firebaseio.com"
});

// npm i -g nodemon
// npm i -g firebase-admin
// npm i
// npm i --save firebase-admin

// cp1
// admin.database().ref('/user').on("child_added", function(snapshot) {
//     console.log(snapshot.key);
//     console.log(snapshot.val());
//     // 0 { age: 25, lastname: 'sdfasdf', name: 'asfdasf' }
//     // 1 { age: 25, lastname: 'sdfgasd', name: 'sdfsdf' }
// });

// cp2
// let uid = 0;
// admin.database().ref('/user/' + uid).on("child_added", function(snapshot) {
//     console.log("root:" + uid + ":" + snapshot.key + ":" + snapshot.val());
// });


// cp3
// let uid = 0;
// admin.database().ref('/user/' + uid).on("child_changed", function(snapshot) {
//     console.log(snapshot.key + ":" + snapshot.val());
// });


// cp4
// let uid = 0;
// admin.database().ref('/user/' + uid).on("child_removed", function(snapshot) {
//     console.log(snapshot.key + ":" + snapshot.val());
//     console.log("delete");
// });

// cp5
// let uid = 0;
// admin.database().ref('/user/').on("child_added", function(snapshot) {
//     // console.log(snapshot.val());
//     var changedPost = snapshot.val();
//     console.log(changedPost.age);
//     console.log(changedPost.name);
//     console.log(changedPost.lastname);

//     // or

//     // console.log(snapshot.child('age').val());
//     // console.log(snapshot.child('name').val());
//     // console.log(snapshot.child('lastname').val());
// });


// cp6
// let uid = 1;
// admin.database().ref('user/' + uid).once('value', function(res) {
//     // console.log(res.val());
//     // console.log(res.child('name').val());
//     // // or
//     // var data = res.val();
//     // console.log(data.name);

//     console.log(res.val());
// });

// cp7
// let uid = 1;
// admin.database().ref('user/' + uid).once('value', function(res) { // same child_added
//     // console.log(res.val());
//     // console.log(res.child('name').val());
//     // or
//     var data = res.val();
//     console.log(data.name);

//     // console.log(res.val());
// });

// cp8
// let uid = 1;
// admin.database().ref('user/' + uid).on('value', function(res) { // same child_chang
//     // console.log(res.val());
//     // console.log(res.child('name').val());
//     // or
//     var data = res.val();
//     console.log(data.name);

//     // console.log(res.val());
// });

// // cp9
// let uid = 1;
// admin.database().ref('user/' + uid).on('value', res => { // same child_chang
//     // console.log(res.val());
//     // console.log(res.child('name').val());
//     // or
//     var data = res.val();
//     console.log(data.name);

//     // console.log(res.val());
// });

// cp10
// let uid = 0;
// admin.database().ref('/user/' + uid).orderByKey().on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key + ":" + res.val());
// });


// cp11
// admin.database().ref('/user/').orderByChild("name").on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key + ":" + res.val());
// });

// // cp12
// admin.database().ref('/user/').orderByValue().on('value', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val().name);
// });


// cp13
// admin.database().ref('/user/').orderByChild('age').limitToLast(10).on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val());
//     // console.log(res.val().name);
// });


// cp14
// admin.database().ref('/user/').orderByValue().limitToLast(10).on('value', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val());
//     // console.log(res.val().name);
// });

// cp15
// admin.database().ref('/user/').orderByChild('name').startAt("aaaa").endAt("xxxx").on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val());
//     // console.log(res.val().name);
// });


// cp16
// let name = "a";
// admin.database().ref('/user/').orderByChild('name').startAt(name).endAt(name + "\uf8ff").on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val());
//     // console.log(res.val().name);
// });


// cp17
// admin.database().ref('/user/').orderByChild('age').equalTo(20).on('child_added', res => { // same child_chang
//     // console.log(res.key);
//     console.log(res.key);
//     console.log(res.val());
//     // console.log(res.val().name);
// });


// orderByChild ใช้ได้กับแค่ on.child_added,on.child_chang
// orderByKey  ใช้ได้กับแค่ on.child_added,on.child_chang

// orderByChild ใช้ไม่ได้กับ on.value or once.value
// orderByKey  ใช้ไม่ได้กับ on.value or once.value

// once == child_added
// on == child_chang

// orderByValue() ใช้ได้กับแค่ on.value หรือ once.value

//orderByKey(), orderByChild() ใช้ได้กับ  
// .startAt(name) 
// .endAt(name + "\uf8ff") 
// .equalTo(20) 
// .limitToFirst() 
// .limitToLast()

//orderByValue() ใช้ได้กับ  
// .equalTo(20) 
// .limitToFirst() 
// .limitToLast()

// https://medium.com/firebasethailand/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81-firebase-realtime-database-%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%81%E0%B8%95%E0%B9%88-zero-%E0%B8%88%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-hero-5d09210e6fd6
// https://medium.com/firebasethailand/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81-firebase-hosting-%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%81%E0%B8%95%E0%B9%88-zero-%E0%B8%88%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-hero-1f999edfe8ea
// https://firebase.google.com/docs/database/admin/retrieve-data#ordering-by-value
// https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
// https://github.com/angular/angularfire