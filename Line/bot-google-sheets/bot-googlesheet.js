var channelToken = 'xxx';
var ggs = SpreadsheetApp.openByID("xxxx");
var Conn = ggs.getSheetByName("xxxx");

function replyMsg(replyToken, userMsg, channelToken) {
    var url = 'https://api.line.me/v2/bot/message/reply';
    var opt = {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + channelToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
            'replyToken': replyToken,
            'messages': [{ 'type': 'text', 'text': userMsg }]
        })
    };
    UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
    console.log('info:' + e.postData.contents);
    var value = JSON.parse(e.postData.contents);
    try {
        var events = value.events;
        if (events != null) {
            for (var i in events) {
                var event = events[i];
                var type = event.type;
                var replyToken = event.replyToken;
                var sourceType = event.source.type;
                var sourceId = LineHelpers.getSourceId(event.source);
                var userId = event.source.userId;
                var groupId = event.source.groupId;
                var timeStamp = event.timestamp;
                switch (type) {
                    case 'postback':
                        break;
                    case 'message':
                        var messageType = event.message.type;
                        var messageId = event.message.id;
                        var messageText = event.message.text;
                        var values = Conn.getRange(2, 1, Conn.getLastRow(), Conn.getLastColumn()).getValues();
                        for (var i = 0; i < values.length; i++) {
                            if (values[i][0] == messageText) {
                                i = i + 2;
                                var Messdata = Conn.getRange(i, 2).getValue();
                                replyMsg(replyToken, Messdata, channelToken);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (ex) {
        console.log(ex);
    }
}