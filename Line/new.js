// admin.database().ref("menu/ขนม/hellox").set(0);

// let numberOfUsers = 2;
// let randomIndex = Math.floor(Math.random() * numberOfUsers);
// console.log(randomIndex);

// admin.database().ref("users").push({ name: randomIndex });

// admin.database().ref('users').limitToFirst(randomIndex).limitToLast(0).once('value', snapshot => {
//     console.log(snapshot.val());
//     // do something with the user data
// });

// admin.database().ref('random-menu/' + randomIndex).orderByKey().once('value', snapshot => {
//     console.log(snapshot.val());
//     console.log(snapshot.child("cal").val());

//     // do something with the user data
// });

// let bmr = 1590;
// admin.database().ref('random-menu/' + Math.floor(Math.random() * numberOfUsers)).orderByKey().once('value', snapshot => {
//     if (snapshot.child("cal").val() <= bmr) {
//         console.log("OK");
//         for (let index = 0; index < snapshot.numChildren(); index++) {
//             console.log(Object.keys(snapshot.val())[index].toString() + "-" + snapshot.child(Object.keys(snapshot.val())[index]).val().toString());
//         }
//     }
// });

// save user
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
//         // agent.add(`ได้ทำการบันทึกเลงฐานข้อมูลเรียบร้อยแล้ว`);
//     });
// });

// ชื่อ $name เพศ $gender อายุ $age น้ำหนัก $weight ส่วนสูง $height หมู่เลือด $bloodtype อาชีพ $job โรคประจำตัว $congenitaldisease แพ้อาหาร $foodallergy ใช่มั้ย


// admin.database().ref('users').orderByKey().once('value', snap => {
//     // console.log(snap.ref);
//     // do something with the user data
// });


// admin.database().ref('randomsmenu').orderByChild("cal").equalTo(1190).once('value', snapshot => {
//     console.log(snapshot.val());
//     // do something with the user data
// });

// admin.database().ref("menu").once("value", snapshot => {
//     console.log(snapshot.val());
// });

// admin.database().ref("menu/" + type).orderByKey().startAt(name).endAt(name + "\uf8ff").on("child_added", snapshot => {
// console.log(snapshot.key);
// console.log(snapshot.val());
// });

// function CALORIE(menu) {
//     let type = "อาหาร";

//     admin.database().ref("menu/" + type).orderByKey().startAt(menu).endAt(menu).once("value", snapshot => {

//         if (snapshot.val() == null) {
//             console.log("Not");
//             admin.database().ref("new-menu").push({ name: menu });
//         } else {
//             console.log(Object.keys(snapshot.val())[0].toString());
//             const value = snapshot.child(Object.keys(snapshot.val())[0]).val().toString();
//             console.log(value);

//         }
//     });
//     admin.database().ref("menu/" + type).orderByKey().startAt(menu).endAt(menu).once("child_added", snapshot => {
//         console.log(snapshot.key.toString() + " " + snapshot.val().toString());
//     });

// }

// CALORIE("แกง");

// const value = snapshot.child(Object.keys(snapshot.val())[0] + '/Temp').val();
// agent.add(`The temperature right now is ${value}`);

// admin.database().ref("room").child("room1").update({ "led1": 0 }).then(_ => {
//     console.log("dd");
// });

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