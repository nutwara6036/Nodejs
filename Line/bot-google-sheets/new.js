var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1yeIOR9mRUp5AewWNjFVyJUQHTWQggiI7FFNKp-dbD6E/edit");
var sheet = ss.getSheetByName('แผ่น1');

function doPost(e) {

    var data = JSON.parse(e.postData.contents)
    var userMsg = data.originalDetectIntentRequest.payload.data.message.text;

    var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
    for (var i = 0; i < values.length; i++) {

        if (values[i][0] == userMsg) {
            i = i + 2;
            var Data = sheet.getRange(i, 3).getValue();
            var emtyroom = sheet.getRange(i, 11).getValue();
            var result = {
                "fulfillmentMessages": [{
                    "platform": "line",
                    "type": 4,
                    "payload": {
                        "line": {
                            "type": "template",
                            "altText": "this is a buttons template",
                            "template": {
                                "type": "buttons",
                                "imageBackgroundColor": "#FFFFFF",
                                "title": "วันที่ 19 ก.ย 63",
                                "text": "มีห้องว่าง" + emtyroom + "ห้อง",
                                "actions": [{
                                        "type": "message",
                                        "label": "เลือกห้อง",
                                        "text": "เลือกห้อง"
                                    },
                                    {
                                        "type": "message",
                                        "label": "เปลี่ยนวันที่",
                                        "text": "เปลี่ยนวันที่"
                                    }
                                ]
                            }
                        }
                    }
                }]
            }

            var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
            return replyJSON;
        }
    }
    if (userMsg == "เลือกห้อง") {

        var values = sheet.getRange(2, 2, sheet.getLastRow(), sheet.getLastColumn()).getValues();
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (values[i][j] == "ว่าง") {
                    var Data = sheet.getRange(i, j).getValue();


                    var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
                    return replyJSON;
                }
            }
        }
    }

    if (userMsg == "เปลี่ยนวันที่") {
        var result = {
            "fulfillmentMessages": [{
                "platform": "line",
                "type": 4,
                "payload": {
                    "line": {
                        "type": "text",
                        "text": "ลูกค้าต้องการเข้าพักวันไหนคะ"
                    }
                }
            }]
        }

        var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
        return replyJSON;
    }

}


var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1yeIOR9mRUp5AewWNjFVyJUQHTWQggiI7FFNKp-dbD6E/edit");
var sheet = ss.getSheetByName('แผ่น1');

function doPost(e) {

    var data = JSON.parse(e.postData.contents)
    var userMsg = data.originalDetectIntentRequest.payload.data.message.text;

    if (userMsg == "19 ก.ย 63") {
        sheet.getRange(6, 1).setValue("OK");
    }

    // search
    //    var search_msg = sheet.getRange(2,1,sheet.getLastRow()).getValues();
    //    console.log(search_msg);

    //    // room1
    //    var count_room1_emty = 0; 
    //    var room1check = sheet.getRange(2,3, sheet.getLastRow()).getValues();
    //    for (var i = 0; i < room1check.length; i++) {
    //        if (room1check[i][0] == "ว่าง") {
    //            count_room1_emty += 1;
    //            sheet.getRange(i+2,3).setBackground("white");
    //        }
    //    }
    //    console.log(count_room1_emty);
    //  
    //  
    //    // room2
    //    var count_room2_emty = 0; 
    //    var room2check = sheet.getRange(2,4, sheet.getLastRow()).getValues();
    //    for (var i = 0; i < room2check.length; i++) {
    //        if (room2check[i][0] == "ว่าง") {
    //            count_room2_emty += 1;
    //            sheet.getRange(i+2, 4).setBackground("white");
    //        }
    //    }
    //    console.log(count_room2_emty);
    //  
    //    var search_msg = sheet.getRange(2, 1, sheet.getLastRow()).getValues();
    //    for (var i = 0; i < search_msg.length; i++) {
    //        if (search_msg[i][0] == "2") {
    //
    //            var date = sheet.getRange(i + 2, 1).getValue();
    //            console.log(date);
    //            var emtyroom = sheet.getRange(i + 2, 11).getValue();
    //            console.log(emtyroom);
    //         
    //        }
    //    }
    //  

}