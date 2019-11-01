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


    function bodyMassIndex(agent) {

        let number = request.body.queryResult.parameters.number;
        // const numberParam = agent.parameters.number;
        // const number = numberParam;

        //agent.add(`OK` + number);

        return admin.database().ref("/switch").update({ switch1: number }).then(snapshot => {
            //agent.add(snapshot.val());
            console.log('ok');
        });

    }

    let intentMap = new Map();
    intentMap.set('Ask - custom - yes', bodyMassIndex);
    agent.handleRequest(intentMap);
});