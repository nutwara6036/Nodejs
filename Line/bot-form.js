function generateMessage(e) {
    var form = FormApp.openById('FORM ID'); //Replace your form id 
    var itemResponses = e.response.getItemResponses();
    var text_data = 'มีปัญหาแจ้งเข้ามาใหม่';
    for (var j = 0; j < itemResponses.length; j++) {
        var itemResponse = itemResponses[j];
        text_data += '\n' + itemResponse.getItem().getTitle() + ': ' + itemResponse.getResponse()
    }
    sendNotification(text_data);
}

function sendNotification(text) {
    var formData = {
        'message': text,
    };
    var token = 'TOKEN'; //Replace your LINE token id here
    var options = {
        'method': 'post',
        'headers': { 'Authorization': "Bearer " + token },
        'contentType': 'application/x-www-form-urlencoded',
        'payload': formData
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}