const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

exports.helloWorld = functions
    .runWith({ memory: '128MB' })
    .firestore.document(`affiliates/{affiliateId}`)
    .onDelete(async (docSnap, context) => {
        await sleep(100);
        await db.collection('bar').doc('bar').set({bar: 'bar'});
    });