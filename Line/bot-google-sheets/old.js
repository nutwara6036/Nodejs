/////////////ตรวจห้องว่าง/////////////
{
    function doPost(e) {
        var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1CElci54aFUagbBC-GQ61l9mYq-1bzc9JXkkWcaKrZH8/edit");
        var sheet = ss.getSheetByName("แผ่น1");

        var data = JSON.parse(e.postData.contents)
        var userMsg = data.originalDetectIntentRequest.payload.data.message.text;
        var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();


        for (var i = 0; i < values.length; i++) {

            if (values[i][0] == userMsg) {
                i = i + 2;
                var Data = sheet.getRange(i, 2).getValue();

                var result = {
                    "fulfillmentMessages": [{
                        "platform": "line",
                        "type": 4,
                        "payload": {
                            "line": {
                                "type": "text",
                                "text": data
                            }

                        }
                    }]
                }

                var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
                return replyJSON;
            }
        }

    }
}



//////////////แจ้งซ่อม ///////////////

var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1CElci54aFUagbBC-GQ61l9mYq-1bzc9JXkkWcaKrZH8/edit");
var sheet = ss.getSheetByName("แจ้งซ่อม");

function doPost(e) {

    var data = JSON.parse(e.postData.contents);
    var userMsg = data.originalDetectIntentRequest.payload.data.message.text;
    var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
    var userCommand = userMsg.split("/");
    if (userCommand[13] == "แจ้งซ่อม") {
        sheet.getRange(values.length + 1, 1).setValue(userCommand[14]);
        sheet.getRange(values.length + 1, 2).setValue(userCommand[15]);
        sheet.getRange(values.length + 1, 3).setValue(userCommand[16]);
        var result = {
            "fulfillmentMessages": [{
                    "platform": "line",
                    "type": 4,
                    "payload": {
                        "line": {
                            "type": "text",
                            "text": "เพิ่มข้อมูลเรียบร้อยแล้ว"
                        }
                    }
                },
                {
                    "platform": "line",
                    "type": 4,
                    "payload": {
                        "line": {
                            "type": "sticker",
                            "packageId": "2",
                            "stickerId": "179"
                        }
                    }
                }
            ]
        }
        var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
        return replyJSON;
    }
}