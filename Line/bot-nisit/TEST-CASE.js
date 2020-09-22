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

//  solotion
let dateFrom = "02-05-2020";
let dateTo = "20-09-2020";
let dateCheck = "31-09-2020";

let from = new Date(dateFrom.split("-")[2], parseInt(dateFrom.split("-")[1]) - 1, dateFrom.split("-")[0]); // -1 because months are from 0 to 11
let to = new Date(dateTo.split("-")[2], parseInt(dateTo.split("-")[1]) - 1, dateTo.split("-")[0]);
let check = new Date(dateCheck.split("-")[2], parseInt(dateCheck.split("-")[1]) - 1, dateCheck.split("-")[0]);

if (check > from && check < to) {
    console.log("d");
} else {
    console.log("s");
}

// TEST 3
return admin.database().ref('documentNU/').on("child_added", function(snapshot) {
    if (snapshot.key == "NU-4") {

        let dateCheck = ("0" + new Date().getDate()).slice(-2) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getFullYear();
        let from = new Date(snapshot.child("datestart").val().toString().split("-")[2], parseInt(snapshot.child("datestart").val().toString().split("-")[1]) - 1, snapshot.child("datestart").val().toString().split("-")[0]); // -1 because months are from 0 to 11
        let to = new Date(snapshot.child("dateend").val().toString().split("-")[2], parseInt(snapshot.child("dateend").val().toString().split("-")[1]) - 1, snapshot.child("dateend").val().toString().split("-")[0]);
        let check = new Date(dateCheck.split("-")[2], parseInt(dateCheck.split("-")[1]) - 1, dateCheck.split("-")[0]);

        if (check > from && check < to) {
            console.log(`ยังอยู่ในช่วงเวลาส่งเอกสาร : ` + snapshot.child("datestart").val().toString() + ` ถึง ` + snapshot.child("dateend").val().toString());
        } else if (snapshot.child("datestart").val().toString() == "-" && snapshot.child("dateend").val().toString() == "-") {
            console.log(`ยังไม่มีการกำหนดช่วงเวลา สามารถส่งได้ตลอดเวลา`);
        } else {
            console.log(`หมดเวลาส่งเอกสาร`);
        }
    }
});