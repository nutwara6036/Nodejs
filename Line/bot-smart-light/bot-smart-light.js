"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://ggez-knmiei.firebaseio.com'
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