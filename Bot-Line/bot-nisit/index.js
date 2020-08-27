// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://petition-fqrs.firebaseio.com/'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    function QuickAsk(agent) {
        let number = request.body.queryResult.parameters.number;
        return admin.database().ref('user/').on("child_added", function(snapshot) {
            if (snapshot.key == number) {
                agent.add(`รหัสนิสิต : ` + snapshot.child("id").val().toString() +
                    `\n ชื่อ-นามสกุล : ` + snapshot.child("name").val().toString() +
                    `\n ชั้นปี : ` + snapshot.child("year").val().toString() +
                    `\n สาขา : ` + snapshot.child("majors").val().toString() +
                    `\n อาจารย์ที่ปรึกษา : ` + snapshot.child("advisor").val().toString() +
                    `\n หัวหน้าภาคสาขาวิชา : ` + snapshot.child("headofdepartment").val().toString() +
                    `\n คณบดี : ` + snapshot.child("dean").val().toString());
                agent.add(`คุณต้องการที่จะสอบถามเอกสารใด NU-4 ถึง NU-21 ให้พิมพ์ NU-ตามด้วยเลข เช่น NU-4 แล้วรอคำแนะนำการดำเนินการค่ะ`);
            }
        });
    }

    function getUser(agent) {
        let idnumber = request.body.queryResult.parameters.idnumber;
        return admin.database().ref('user/').on("child_added", function(snapshot) {
            if (snapshot.key == idnumber) {
                agent.add(`รหัสนิสิต : ` + snapshot.child("id").val().toString() +
                    `\n ชื่อ-นามสกุล : ` + snapshot.child("name").val().toString() +
                    `\n ชั้นปี : ` + snapshot.child("year").val().toString() +
                    `\n สาขา : ` + snapshot.child("majors").val().toString() +
                    `\n อาจารย์ที่ปรึกษา : ` + snapshot.child("advisor").val().toString() +
                    `\n หัวหน้าภาคสาขาวิชา : ` + snapshot.child("headofdepartment").val().toString() +
                    `\n คณบดี : ` + snapshot.child("dean").val().toString());
                agent.add(`คุณต้องการที่จะสอบถามเอกสารใด NU-4 ถึง NU-21 ให้พิมพ์ NU-ตามด้วยเลข เช่น NU-4 แล้วรอคำแนะนำการดำเนินการค่ะ`);
            }
        });
    }

    function getNU(agent) {
        let documentid = request.body.queryResult.parameters.documentid;
        return admin.database().ref('documentNU/').on("child_added", function(snapshot) {
            if (snapshot.key == "NU-" + documentid) {
                agent.add(`แบบฟอร์ม : ` + "NU-" + documentid.toString() +
                    `\n ชื่อแบบฟอร์ม : ` + snapshot.child("name").val().toString() +
                    `\n ความหมายแบบฟอร์ม : ` + snapshot.child("meaning").val().toString() +
                    `\n LINK : ` + snapshot.child("url").val().toString() +
                    `\n คำแนะนำ : `);
                snapshot.child("suggestion").val().split(',').forEach(element => {
                    agent.add(` - ` + element);
                });
            }
        });
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Quick-Ask - yes', QuickAsk);
    intentMap.set('PetitionNU - custom - yes', getUser);
    intentMap.set('getsNU - yes', getNU);
    agent.handleRequest(intentMap);
});