// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://automatics-hamako.firebaseio.com'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    function menu(agent) {

        let state = request.body.queryResult.parameters.state;
        if (state == 1) {
            return admin.database().ref("/sensor/").update({ relay: state }).then(_ => {
                agent.add(`เรียบร้อยแล้ว`);
                return admin.database().ref("sensor").once("value", snapshot => {
                    let result = "none";
                    var state = snapshot.child("relay").val();
                    if (state == 0) {
                        result = "ปิด";
                    } else {
                        result = "เปิด";
                    }
                    agent.add(`สถานะปั้มน้ำ : ` + result.toString() + `เรียบร้อยแล้ว`);
                });
            });

        } else if (state == 0) {
            return admin.database().ref("/sensor/").update({ relay: state }).then(_ => {
                agent.add(`เรียบร้อยแล้ว`);
                return admin.database().ref("sensor").once("value", snapshot => {
                    let result = "none";
                    var state = snapshot.child("relay").val();
                    if (state == 0) {
                        result = "ปิด";
                    } else {
                        result = "เปิด";
                    }
                    agent.add(`สถานะปั้มน้ำ : ` + result.toString() + `เรียบร้อยแล้ว`);
                });
            });
        } else {
            agent.add(`กรุณาเลือกเมนูค่ะ`);
        }
    }

    function askhumidity(agent) {
        let result = "none";
        return admin.database().ref("sensor").once("value", snapshot => {
            var state = snapshot.child("values_sensor").val();
            if (state < 50) {
                result = "ความชื้นต่ำ";
            } else {
                result = "ความชื้นสูง";
            }
            agent.add(`ค่า : ` + result.toString());
        });
    }

    let intentMap = new Map();
    intentMap.set('ask-menu - custom - yes', menu);
    intentMap.set('ask-humidity', askhumidity);
    agent.handleRequest(intentMap);
});