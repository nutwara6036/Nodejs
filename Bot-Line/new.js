// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

var admin = require("firebase-admin");

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');


admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "plug-htjrgv",
        "private_key_id": "426baae2ad0665fd7a567182167ff88ecf96c25c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChCAm7hk58vWdo\nd47Pd9rIg9JknLO+7oA7mUt0CBQ/veLD2s4/VIzvwM3mR7htMcxwee0z4yXwuMBi\nWdwaFibc3/J0vjFGNLFHeuK6dzOOnV2G9Vf85P3Aqd101J3SwoYeL47XeUbL6HyG\nVUYf64l5s/l9KEt9lAuPahehfczC0VLkHkp112D2ShtXQj0yg/p03bkY5F7sJnJQ\n+mnF4+r64q1oEPkwti1jzQJRmlfMEn6HyGLmCoIR8SO5qKEC9cxYidHx/aTvj0sX\nWtYW6xJzxGUNN1og9DBRBQE8/yFqrRyLHeX5i+KyoZCFunX7H3wkgBH5TfMhs3ZI\n4BEfFiTHAgMBAAECggEACG3ZyJGesSPe8lZzyMNe1ekkjbSwKfnlB3meO/wiRzXi\n1VqyOhlsaS5f+MJfUoPtTiPruTAWL9QT6fIHNexb62rjj53XCXQ/pVy22ojbz4bI\nOwTDrs6zw66Ak5l/i2U4TQMzSG8mOA0623NCQPB82TyE/jqqPPAPbNniU8c4fSgP\nkd8llEHfE7jKtiiDeNVQlNZgTe+WKzfXT/8PohRCQ2OQUkhgwAtMoa5WumYCVQEU\nueovQDdA/ZJeq30+12kW0BNEjm2j21f0gm5GVBMaD3XUdEiK9mOcIi3kkFmIcumM\ngL2McfcJNEPDZKjTgFo3r5/QPPii87Zi49xX1pOERQKBgQDXlijlVeDxjlhx50gj\n4iRG9eb9pmO6UgoH5Pvrp9x28T0aGGKzxbshCT+t3RDhnJYmn6n+S2f7TAN6xsij\n3Le9p/CzETlOVDpY276fUtqjB7Y6VFeUCSmvuYBM8KPxHZRMBCVAEoeEjPlWcFHT\n5ygXK8u/1VV2Nl6w65UmO5BlZQKBgQC/N9DxzK9no1rjPOq3avTFNTzebEeMGjQb\nVPHL+kq9O8Upzatu1yU8Q6T+IlH2BD9Ifz2JU6qbm0DiwY3qEjX7M1Wma0sDvL2L\nL0ajK2MlifzvWYqSRWsq5rF2AYAbCYZCDA+BtVsRq/Jaz/Q+cNIKuYjcvBCsDleZ\nWtAIe8SEuwKBgQCYYZ/ocio8MyQa5qJcErUXnyo1cY2eHezPJbBXImA3hk5tCn2B\nmiqpsDLdfps3DQoopMRwZPZLbrAq8STShekt2e3NdEgwMGLJehEj5ll50LKiSglZ\nLpzTg2fHenQ2snSmwmtd/XriWw7GZT/BauswbZlnr6/njYiivvG+g22N7QKBgCvx\nktYOuPyzQM7aEALI1KmBe5SOA79BwlnJoqvCwGxOkRfzSQN28/qufPtePcGw5i4t\n96FYleueuUGjQ47YUomBGZzeKWYZeOHEopIbBXT6CiOjS0IkK+W3EG9TFvKftLf2\n95VSbTRZdJ/EDJhQ6yRF0RsRKS+xOBZpFUft0ZLDAoGAI3rqPs3qS2j/7JnqOppY\nlXrQqR1visb2XNycswgOoYlCJLkInmmFHhbg3RBHa/XjrBtzmd5kDEOK6svl706V\nLFdYOnBCCN7eYL5zNDhwmOVmN/JKYTXNjG8DEn4LmD6gGEmF+FJDdJV3izmi7F7j\noBHVHRMgc3p8rGgkU3da0oY=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-24bf5@plug-htjrgv.iam.gserviceaccount.com",
        "client_id": "101298432071038212579",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-24bf5%40plug-htjrgv.iam.gserviceaccount.com"
    }),
    databaseURL: "https://plug-htjrgv.firebaseio.com"
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