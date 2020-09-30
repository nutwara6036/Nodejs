var linksheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1yeIOR9mRUp5AewWNjFVyJUQHTWQggiI7FFNKp-dbD6E/edit");
var sheet = linksheets.getSheetByName('แผ่น1');
var sheet2 = linksheets.getSheetByName('แจ้งซ่อม');

function doPost(e) {

    var array0 = [{}];
    var array1 = [{}];
    var array2 = [{}];
    var array3 = [{}];
    var array4 = [{}];
    var array5 = [{}];
    var array6 = [{}];


    var data = JSON.parse(e.postData.contents)
    var userMsg = data.originalDetectIntentRequest.payload.data.message.text;

    // var userMsg = "19 ก.ย 63";
    // var userMsg = "จองห้องหมายเลข 3 วันที่ 2 ก.ย 63";
    // var userMsg = "แจ้งซ้อมห้อง 1 ประตูพัง 0907487359";

    array0 = userMsg.split(" ")[0];
    array1 = userMsg.split(" ")[1];
    array2 = userMsg.split(" ")[2];
    array3 = userMsg.split(" ")[3];
    array4 = userMsg.split(" ")[4];
    array5 = userMsg.split(" ")[5];
    array6 = userMsg.split(" ")[6];

    // search
    var search_msg = sheet.getRange(2, 1, sheet.getLastRow()).getValues();
    for (var i = 0; i < search_msg.length; i++) {
        if (search_msg[i][0] == array0) { // message form line 

            var date = sheet.getRange(i + 2, 1).getValue(); // วันที่
            var detail = sheet.getRange(i + 2, 2).getValue(); // ข้อมูลห้อง เลือกใส่ได้ตามใจ
            var emtyroom = sheet.getRange(i + 2, 11).getValue(); // จำนวนห้องว่าง
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

    // เลือกห้องวันที่ 19 ก.ย 63 --> array0.array1.array2.array3
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
                                                "text": "จองห้องหมายเลข 1 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 3).getValue() // day mou year
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 2",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 4).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 2 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 4).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 3",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 5).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 3 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 5).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 4",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 6).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 4 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 6).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 5",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 7).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 5 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 7).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 6",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 8).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 6 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 8).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 7",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 9).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 7 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 9).getValue()
                                            }]
                                        },
                                        {
                                            "thumbnailImageUrl": "https://cdn.renthub.in.th/images/uploaded/201905/20190514/apartment_pictures/normal/803ef79e3f1845a03e2d85c30c98a071.jpg",
                                            "title": "Room 8",
                                            "text": "สถานะการจอง " + sheet.getRange(i + 2, 10).getValue(),
                                            "actions": [{
                                                "type": "message",
                                                "label": "จอง",
                                                "text": "จองห้องหมายเลข 8 วันที่ " + array1 + " " + array2 + " " + array3 + " " + sheet.getRange(i + 2, 10).getValue()
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

    // จองห้องหมายเลข 1 วันที่ 1 ก.ย 63 --> array0.array1.array2.array3.array4.array5.array6
    if (array0 == "จองห้องหมายเลข" && array6 == "ว่าง") {
        var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
        for (var i = 0; i < values.length; i++) {
            if (values[i][0] == array3) { // date
                if (array1 == "1") { // room
                    sheet.getRange(i + 2, 3).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "2") {
                    sheet.getRange(i + 2, 4).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "3") {
                    sheet.getRange(i + 2, 5).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "4") {
                    sheet.getRange(i + 2, 6).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "5") {
                    sheet.getRange(i + 2, 7).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "6") {
                    sheet.getRange(i + 2, 8).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "7") {
                    sheet.getRange(i + 2, 9).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
                                        }
                                    }
                                }
                            }
                        }]
                    }
                } else if (array1 == "8") {
                    sheet.getRange(i + 2, 10).setValue("รอชำระเงิน").setBackground('red');
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
                                                    "text": "วันที่เข้าพัก " + array3 + " " + array4 + " " + array5,
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
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "button",
                                                "style": "primary",
                                                "action": {
                                                    "type": "message",
                                                    "label": "แจ้งชำระเงิน",
                                                    "text": "แจ้งชำระเงินห้อง " + array1 + " วันที่ " + array3 + " " + array4 + " " + array5
                                                }
                                            }]
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
    } else if (array0 == "จองห้องหมายเลข" && array6 != "ว่าง") { // รอ รอเข้าพัก ไม่ว่าง
        var result = {
            "fulfillmentMessages": [{
                    "platform": "line",
                    "type": 4,
                    "payload": {
                        "line": {
                            "type": "text",
                            "text": "ไม่สมารถจองห้องหมายเลข " + array1 + " ได้ ห้อง" + array6 + "ค่ะ"
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

    // ชำระเงิน
    // แจ้งชำระเงินห้อง 1 วันที่ 1 ก.ย 63 --> array0.array1.array2.array3.array4.array5
    if (array0 == "แจ้งชำระเงินห้อง") {
        var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
        for (var i = 0; i < values.length; i++) {
            if (values[i][0] == array3) { // date
                if (array1 == "1") { // room
                    sheet.getRange(i + 2, 3).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "2") {
                    sheet.getRange(i + 2, 4).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "3") {
                    sheet.getRange(i + 2, 5).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "4") {
                    sheet.getRange(i + 2, 6).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "5") {
                    sheet.getRange(i + 2, 7).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "6") {
                    sheet.getRange(i + 2, 8).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "7") {
                    sheet.getRange(i + 2, 9).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                } else if (array1 == "8") {
                    sheet.getRange(i + 2, 10).setValue("รอเข้าพัก").setBackground('green');
                    var result = {
                        "fulfillmentMessages": [{
                                "platform": "line",
                                "type": 4,
                                "payload": {
                                    "line": {
                                        "type": "text",
                                        "text": "แจ้งชำระเงินเรียบร้อยแล้ว"
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
                }
                var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
                return replyJSON;
            }
        }
    }

    // แจ้งซ่อม
    // แจ้งซ้อมห้อง 1 ประตูพัง 0907487359 --> array0.array1.array2.array3
    if (array0 == "แจ้งซ่อมห้อง" && array1 != " " && array2 != " " && array3 != " ") {

        var values = sheet2.getRange(2, 1, sheet2.getLastRow(), sheet2.getLastColumn()).getValues();
        sheet2.getRange(values.length + 1, 1).setValue(array1); // id room
        sheet2.getRange(values.length + 1, 2).setValue(array2); // detail
        sheet2.getRange(values.length + 1, 3).setValue(array3); // phone

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