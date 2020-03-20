"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");


const admin = require("firebase-admin");

//default

// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://ggez-knmiei.firebaseio.com'
// });

admin.initializeApp({

    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "d-bot-line-wfhxay",
        "private_key_id": "bbfe5d744398cc7e41085fef70710abdd9debdb8",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0/ja+i1T3qmar\nQzte09mWXY1dLIbcSY8pnLbd+VO9jdpHDumMIRG3szSUhifA0D/op0bA2dkNvX6l\nY8jXwMAfacAfunSKxv89qQyZEuzlCQNbrcVIV5tYnYSF4/nOik9gFs+PDCSdWLMn\nd051fSXos5z9m67EeDkrAL0w0NcSkqrqHWyepQxSWRWvt0MC3XuVMzDUqyO70JR9\nTs61SGfm8QeyTwa2rpNyJVAMM8S3O/WGfdZaWc/csLDJyn/AHBHhphf7fvOZWhnw\nsMObk/aBs/KVbbU/HPj4rMEJPt97Qw3cdSvlpa/OJAfiNcl4ZR4LE905LPZMvLD6\nR8ZHxAZlAgMBAAECggEATNX3C6E+6v1OJLqgA7vQDYOdtcZnYjFgM3wyLb3hDQGh\nfrUX9MM9ME1Frx/c1IAUAYKyCMDy4mBl2XSpGN7dMPjF9TJEs32TcevIS1u7cegH\nou38aJ+4dUA5uFV2AXa6B8LnToULLjkvpTuC9WGxrD5EEW38HbAkJNtldcnS5DDk\nogH9/gqvv/AJQ5X1S59fH+kD1KzYEcGAtJXGPbenkbOKryP2qdvIeHLaVLiZV5Z5\nPOcI8PXl1HNCnNxpgAU1yZjcICGbGCcCaBhKi0yoxnhsWJcXUXn8e8WEVBG3eret\nbC485z1dBRGSKY273W8Si4Z+94GFED7r6VO5PPMraQKBgQDhtIU5ccAe2vWsKAbZ\nzcYP/6j6bZnGzq6rH738XLjMICGfdU5+wv+vksVGGfTXsSPulTjb4MslBvjxNNjl\n+I8Cr0PzQcIVqZumbB94/a/xCHUQj3CpQriYBuZs4jw0H5QjdA9+gtbnb+Dtlpp0\nXEjnSxxwKU5hQbH0TkaaxCWo4wKBgQDNSVW6tgGsrt/b0HXmkgmTFTwmj4wtAAk1\n/liAdWYip+uUAxUy+EeccxTbTKGedgCcfRKAUVb0f2Yozq6X194gAmuDUyBzeqWH\nYfIVdIKm6P6FaWL68JV+8WzRKm7TgkNZvtZ5048D0shYaZqoKzqF988jUoUC0UHx\nk87xnO/eFwKBgEyhiNYPG+ad+ulfkavjZIrMB6g3DA3m4IDzPwLuzENp6WCFaIg7\nVqpaz6XUbD/LQeLgQTTOJsrEikMC6V1zPcLwlMaDngzS0Cj57tmacGEKuQxNVzfw\nklHzjcqMKVqdGiPLZPNUIvjjEGA6UOiO6KW258nhDF6S+oNzDB/B1vN3AoGBAMP0\ngq7tWX/albkfrctgD1+k33v3fljeNeyiUxyb89iU7ZylrLCwqrq+Z2RGK+g0v7Sg\n9u4htp1AluXRFHvBBTkM1k/PI6TXp/YpGoo8YxKsSXhT9rWOvUUlczfeB1hCecPL\nFLPJrDR8Gd27QHPSf9Stjb4r4OellArjiqC7q4QVAoGBAKQgU9S5lrK4nrgENSb3\nTEr2d8ip9+fc5zcod2ueBsZzK88BPOsvJGit+wsVDkRnz9qZbyKspscwBvmLjbWM\n1zj3xUpaxxG5PYMvTLdVIqUpYUmxz7c2xiOCizVtIKmw+jAOkbWP7iLy2BRqZnhw\ns9CdfxC1iLfoJgFzO6L9y5PQ\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-rquc9@d-bot-line-wfhxay.iam.gserviceaccount.com",
        "client_id": "112322675909180475443",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rquc9%40d-bot-line-wfhxay.iam.gserviceaccount.com"
    }),
    databaseURL: 'https://d-bot-line-wfhxay.firebaseio.com'
});


process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });


    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function bodyMassIndex(agent) {

        let room = request.body.queryResult.parameters.room;
        let led = request.body.queryResult.parameters.led;
        let state = request.body.queryResult.parameters.state;

        if (room == 1 && led == 1) {
            return admin.database().ref("/room/room1/").update({ led1: state }).then(_ => {
                agent.add(`ห้อง` + room.toString() + `เปิดไฟหลอดที่` + led.toString() + `เรียบร้อยแล้ว`);
            });
        } else if (room == 1 && led == 2) {
            return admin.database().ref("/room/room1/").update({ led2: state }).then(_ => {
                agent.add(`ห้อง` + room.toString() + `เปิดไฟหลอดที่` + led.toString() + `เรียบร้อยแล้ว`);
            });
        } else if (room == 2 && led == 1) {
            return admin.database().ref("/room/room2/").update({ led1: state }).then(_ => {
                agent.add(`ห้อง` + room.toString() + `เปิดไฟหลอดที่` + led.toString() + `เรียบร้อยแล้ว`);
            });
        } else if (room == 2 && led == 2) {
            return admin.database().ref("/room/room2/").update({ led2: state }).then(_ => {
                agent.add(`ห้อง` + room.toString() + `เปิดไฟหลอดที่` + led.toString() + `เรียบร้อยแล้ว`);
            });
        }
    }

    function CheckStatus(agent) {

        let checkroom = request.body.queryResult.parameters.checkroom;
        let checkled = request.body.queryResult.parameters.checkled;

        //agent.add(checkroom.toString());
        let result = "none";

        return admin.database().ref("room").once("value", snapshot => {
            var state = snapshot.child("room" + checkroom).child("led" + checkled).val();
            if (state == 1) {
                result = "เปิด";
            } else {
                result = "ปิด";
            }
            //agent.add(`${state}`);
            agent.add(`ห้อง` + checkroom.toString() + `ไฟหลอดที่` + checkled.toString() + `ได้ทำการ` + result.toString());
        });
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('ask-room - custom - yes', bodyMassIndex);
    intentMap.set('ask-status - custom - yes', CheckStatus);
    agent.handleRequest(intentMap);
});