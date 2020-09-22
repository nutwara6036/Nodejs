// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

var admin = require("firebase-admin");

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://ggez-knmiei.firebaseio.com'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function bodyMassIndex(agent) {
        let state = request.body.queryResult.parameters.number;
        let result = "none";
        agent.add(`I didn't understand` + state.toString());
        return admin.database().ref("/PLUG/").update({ plug: state }).then(_ => {
            if (state == 1) {
                result = "เปิด";
            } else {
                result = "ปิด";
            }
            agent.add(`ปลั๊กได้ทำการ:` + result.toString());
        });
        //agent.add(`I'm sorry, can you try again?`);
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    //intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('plug - custom - yes', bodyMassIndex);
    agent.handleRequest(intentMap);
});