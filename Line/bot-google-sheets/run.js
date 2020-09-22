var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1yeIOR9mRUp5AewWNjFVyJUQHTWQggiI7FFNKp-dbD6E/edit");
var sheet = ss.getSheetByName('แผ่น1');

function doPost(e) {

    var array0 = [{}];
    var array1 = [{}];
    var array2 = [{}];
    var array3 = [{}];
    var array4 = [{}];
    var array5 = [{}];

    var data = JSON.parse(e.postData.contents)
    var userMsg = data.originalDetectIntentRequest.payload.data.message.text;

    // var userMsg = "19 ก.ย 63";
    // var userMsg = "จองห้องหมายเลข 3 วันที่ 2 ก.ย 63";

    array0 = userMsg.split(" ")[0];
    array1 = userMsg.split(" ")[1];
    array2 = userMsg.split(" ")[2];
    array3 = userMsg.split(" ")[3];
    array4 = userMsg.split(" ")[4];
    array5 = userMsg.split(" ")[5];

    // search
    var search_msg = sheet.getRange(2, 1, sheet.getLastRow()).getValues();
    for (var i = 0; i < search_msg.length; i++) {
        if (search_msg[i][0] == array0) {

            date = sheet.getRange(i + 2, 1).getValue();
            //  console.log(date);
            var emtyroom = sheet.getRange(i + 2, 11).getValue();
            //  console.log(emtyroom);
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
                                "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                "imageBackgroundColor": "#FFFFFF",
                                "title": "วันที่ " + array0 + " " + array1 + " " + array2,
                                "text": "มีห้องว่างทั้งหมด " + emtyroom + " ห้อง",
                                "actions": [{
                                        "type": "message",
                                        "label": "เลือกห้อง",
                                        "text": "เลือกห้องวันที่ " + array0 + " " + array1 + " " + array2
                                    },
                                    {
                                        "type": "message",
                                        "label": "เปลี่ยนวันที่",
                                        "text": "จองห้อง"
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

    // เลือกห้องวันที่ 19 ก.ย 63
    if (array0 == "เลือกห้องวันที่") {
        var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
        for (var i = 0; i < values.length; i++) {
            if (values[i][0] == array1) { // date
                var result = {
                    "fulfillmentMessages": [{
                        "platform": "line",
                        "type": 4,
                        "payload": {
                            "line": {
                                "type": "template",
                                "altText": "this is a carousel template",
                                "template": {
                                    "type": "carousel",
                                    "columns": [{
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 1",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 3).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 1 วันที่ " + array1 + " " + array2 + " " + array3 // day mount year
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 2",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 4).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 2 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 3",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 5).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 3 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 4",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 6).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 4 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 5",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 7).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 5 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 6",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 8).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 6 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 7",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 9).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 7 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 8",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 10).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 8 วันที่ " + array1 + " " + array2 + " " + array3
                                            }]
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
    }

    // จองห้องหมายเลข 1 วันที่ 1 ก.ย 63
    if (array0 == "จองห้องหมายเลข") {
        var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
        for (var i = 0; i < values.length; i++) {
            if (values[i][0] == array3) { // วันที่ 3
                if (array1 == "1") {
                    sheet.getRange(i + 2, 3).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "2") {
                    sheet.getRange(i + 2, 4).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "3") {
                    sheet.getRange(i + 2, 5).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "4") {
                    sheet.getRange(i + 2, 6).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "5") {
                    sheet.getRange(i + 2, 7).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "6") {
                    sheet.getRange(i + 2, 8).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "7") {
                    sheet.getRange(i + 2, 9).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "8") {
                    sheet.getRange(i + 2, 10).setValue("รอ").setBackground('red');
                    var result = {
                        "fulfillmentMessages": [{
                            "platform": "line",
                            "type": 4,
                            "payload": {
                                "line": {
                                    "type": "flex",
                                    "altText": "This is a Flex message",
                                    "contents": {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover"
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "ห้องที่เลือกพัก Room " + array1,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "วันที่เข้าพัก " + array1 + " " + array2 + " " + array3,
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ราคาทั้งหมด 300",
                                                    "size": "sm",
                                                    "color": "#AAAAAA"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                }
                var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
                return replyJSON;
            }
        }
    }

}