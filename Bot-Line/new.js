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
        "project_id": "ask-room-ppogai",
        "private_key_id": "21615532a0b31b5ac53b39c7cbc76ed115420edf",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDAv8bsQpAVpO5W\nSZtram+w51ar5AZuVQDOSXj/C35mLhOhG3PyXkbwPlqgZ/TWOUOwYuFG21pVT6TB\n8VnHuybyWCE7XVfA/983enQ5uliXwJbA5ptDiWMbvQJVJaXFCeiMB9lKdPkdcVso\ni4Qw7Xr0n3FUxJxnisoPx3d+cjsC6hBYxfu8PPTGJAhjJm3ArOCuMx0L/MxuwcTJ\nKfXyOkkE3ESneAQYcHweVFIcHV9EWZNOKOiS29iCySzHoTI2kIZ76O9BB4Zaqvtv\niZYvraNAnotTPR4BqdzDPcFHhAz/re0voGzkOt4Teq/2HiUvLj3xCn1BKVo6svs6\nPlreELpXAgMBAAECggEAO9eOr+1ehInHQVzq9ud9s8OvIgDSilCzxlgDS9PKs3ic\nuYknb1kb1xzU0DZWSmhO/qVEYdZabmAiu9/tytftGJKKBr9NLmuCZtwK151mQf8W\nDt/J1qcB8Su2XK8qj0krPMZ3DOnSKfT2o1jlerdQVEBoVDQShwcNAucfz08xyQ5N\nYtOUQT4XUYxEknYEx4YRobnsXXo06sFl1DnbDHoG4SwZODZ8jgFtYKryP4kvxmNy\nlld77xGfgufx3yAn/gUTbvLM2QENZFWykxgQJNQTR/LxRmdvEsZ0iGGXNOtw4hC8\nFVFAt4IzM493D7ITJK2zdgzRtYZLzGFbIPbdjHCcCQKBgQD8c/vx1JJkK0zSWIaY\nvcusfFa5l+xkYJbWvJ6hY/h+LRpUctTDJqXR+Fslw0zGMmLTo7lojYS8PaB+61kQ\nMSQPqL8dghLwCvM5JCoqv80cAisSQEP+ZmVLZug1sFCOm9VxGvNobo3rUOyqHyNO\nOTQ9r2qzzg20Tzvzfil80II67QKBgQDDdQ0vrW8L3BtwsDEytoXyYedIeSCYGvjP\nQPN3M5eeyq9527BRAVFVnFNMC/kOidB8716sxFyALMHaBXlTbWXnRGvDOqW+xPDB\nV0Eh7Gh1rfj2SGyEUgkgwacxcuhIYgnnXUSgZn2RuGSYlASuPKmdXgR+ch0t1NqL\njJklH4it0wKBgQDkYqVGJRH+zvFjxjSWD/YnaCEpK9jvAjbTs7YquX8/3tvYFD6J\nAfi3mOAUrLdTAphHcPG2NXkktvfwekeLj3lZNUcYkelCAhYB1sbS/8u2D/wZOcyJ\nZOc0rLdcgtKOAUq6VTBphMKdZQuF6D+Pb87kE0MLwVjCi3/oC3XK9fMrDQKBgQCc\n1Q0xlm4mDAUQlK/FS2OLKzeTlW2r3uiKFEnG+eTNC0Fl+/sr5GzIztifinPbUIWz\n2bYT1rOKPV+GeyHw6TT9Lo9xZVudCRVNbZ/bgoAG/QNpSo+YVOLyH7DyIotzmQbt\nWI86TUKwbE57hzmCPTa0CL5+Xz4+ii6aDsTLXtQi9QKBgQC/5AROYq93c28O9OjG\nojG4wtbX4sY7TnIQW6VFO+FOP7UoIq5cccak/T1uPtlaQ/teox3em0iuhxGvlxgu\n4hA9QptbrzTJg3XZPMTKkJybR8JHlB9AtriOdm17ro5I/OsGMeNuwS3IKkeKI8Dr\nm+P1DOyQXY273Be2gS6MlSECEg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-wv17v@ask-room-ppogai.iam.gserviceaccount.com",
        "client_id": "108821071321524697236",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wv17v%40ask-room-ppogai.iam.gserviceaccount.com"
    }),
    databaseURL: "https://ask-room-ppogai.firebaseio.com"
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function bodyMassIndex(agent) {
        let room = request.body.queryResult.parameters.number;
        agent.add(`I didn't understand` + room.toString());
        return admin.database().ref("/room/room1/").update({ led1: room }).then(_ => {
            agent.add(`ห้อง` + room.toString());
        });
        //agent.add(`I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set('ask-room - custom - yes', bodyMassIndex);
    agent.handleRequest(intentMap);
});