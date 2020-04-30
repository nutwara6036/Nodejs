// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://meu-sloccb.firebaseio.com'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function BMI(agent) {
        let weight = request.body.queryResult.parameters.weight;
        let height = request.body.queryResult.parameters.height / 100;
        let bmi = (weight / (height * height)).toFixed(2);
        agent.add(`ค่า BMI ของคุณคือ ` + bmi);
    }

    function BMR(agent) {
        let gender = request.body.queryResult.parameters.gender;
        let age = request.body.queryResult.parameters.age;
        let weight = request.body.queryResult.parameters.weight;
        let height = request.body.queryResult.parameters.height;
        if (gender === 'ชาย') {
            let bmr = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)).toFixed(2);
            agent.add(`ค่า BMR (Basal Metabolic Rate) ของคุณคือ ` + bmr);
        } else if (gender === 'หญิง') {
            let bmr = (665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)).toFixed(2);
            agent.add(`ค่า BMR (Basal Metabolic Rate) ของคุณคือ ` + bmr);
        }
    }

    function CALORIE(agent) {
        let type = request.body.queryResult.parameters.type;
        let name = request.body.queryResult.parameters.name;
        return admin.database().ref("menu/" + type).orderByKey().startAt(name).endAt(name).once("value", snapshot => {
            if (snapshot.val() === null) {
                admin.database().ref("new-menu").push({ name: name });
                // admin.database().ref("menu/" + type + "/" + name).set(0);
                agent.add(`ไม่พบเมนูที่ต้องการ ได้ทำการบันทึกเมนูใหม่นี้ลงฐานข้อมูลเรียบร้อยแล้ว`);
            } else {
                agent.add(`เมนูของคุณคือ ` + Object.keys(snapshot.val())[0].toString() + ` แคลอรี่ ` + snapshot.child(Object.keys(snapshot.val())[0]).val().toString());
            }
        });
    }

    function RANDOM(agent) {
        let name = request.body.queryResult.parameters.name;
        let gender = request.body.queryResult.parameters.gender;
        let age = request.body.queryResult.parameters.age;
        let weight = request.body.queryResult.parameters.weight;
        let height = request.body.queryResult.parameters.height;
        let bloodtype = request.body.queryResult.parameters.bloodtype;
        let congenitaldisease = request.body.queryResult.parameters.congenitaldisease;
        let foodallergy = request.body.queryResult.parameters.foodallergy;

        // bmi 
        let heights = height / 100;
        let bmi = (weight / (heights * heights)).toFixed(2);
        // agent.add(`ค่า BMI ของคุณคือ ` + bmi);

        //bmr
        let bmr = 0;
        if (gender === 'ชาย') {
            bmr = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)).toFixed(2);
            agent.add(`BMR (Basal Metabolic Rate) จำนวนแคลอรี่เหมาะสมต่อวัน  ` + bmr + ` แคลอรี่/วัน`);
        } else if (gender === 'หญิง') {
            bmr = (665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)).toFixed(2);
            agent.add(`BMR (Basal Metabolic Rate) จำนวนแคลอรี่เหมาะสมต่อวัน  ` + bmr + ` แคลอรี่/วัน`);
        }

        // save user
        admin.database().ref("users").push({
            name: name,
            gender: gender,
            age: age,
            weight: weight,
            height: height,
            bloodtype: bloodtype,
            congenitaldisease: congenitaldisease,
            foodallergy: foodallergy,
            bmi: bmi,
            bmr: bmr
        }).then(_ => {
            agent.add(`ได้ทำการบันทึกข้อมูลเรียบร้อยแล้ว`);
        });

        // randomIndex
        let numberOfUsers = 2;
        return admin.database().ref('random-menu/' + Math.floor(Math.random() * numberOfUsers)).orderByKey().once('value', snapshot => {
            if (snapshot.child("cal").val() <= bmr) {
                for (let index = 0; index < snapshot.numChildren(); index++) {
                    agent.add(`ประเภท ` + Object.keys(snapshot.val())[index].toString() + ` : ` + snapshot.child(Object.keys(snapshot.val())[index]).val().toString());
                }
            }
        });
    }

    function NEWRANDOM(agent) {
        let numberOfUsers = 2;
        return admin.database().ref('random-menu/' + Math.floor(Math.random() * numberOfUsers)).orderByKey().once('value', snapshot => {
            for (let index = 0; index < snapshot.numChildren(); index++) {
                agent.add(`ประเภท ` + Object.keys(snapshot.val())[index].toString() + ` : ` + snapshot.child(Object.keys(snapshot.val())[index]).val().toString());
            }
        });
    }


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('BMI - custom - yes', BMI);
    intentMap.set('BMR - custom - yes', BMR);
    intentMap.set('CALORIE - custom - yes', CALORIE);
    intentMap.set('RANDOM - custom - yes', RANDOM);
    intentMap.set('RANDOM - custom - no - custom - yes', NEWRANDOM);
    agent.handleRequest(intentMap);
});