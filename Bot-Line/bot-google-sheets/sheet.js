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