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