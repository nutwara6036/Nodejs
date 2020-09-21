var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1yeIOR9mRUp5AewWNjFVyJUQHTWQggiI7FFNKp-dbD6E/edit");
var sheet = ss.getSheetByName('แผ่น1');

function doPost(e) {

    var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
    console.log(values);
    for (var i = 0; i < values.length; i++) {
        if (values[i][0] == "a") {
            i = i + 2;
            var Data = sheet.getRange(i, 3).getValue();
            console.log(Data);
        }
    }
}