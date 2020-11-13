/**
 * @jest-environment node
 */

const firebase = require('@firebase/rules-unit-testing')

// ** need ** to be the same used in firebase init because firebase emulators:start don't respect the .firebaserc project name
// if you use a random projectId on tests the emulator won't run the triggers functions
// a strange behaviour but not related to this issue
const APP_ID = 'mlbadmin-dev';

async function dumbDataFactory(db) {
    for (let i = 0; i < 100; i++) {
        await db.collection('affiliates').doc().set({foo: 'bar'});
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

test('disable triggers test', async () => {
    const db = firebase.initializeTestApp({projectId:  APP_ID}).firestore();
    await dumbDataFactory(db);

    await firebase.withFunctionTriggersDisabled(async () => {
        await firebase.clearFirestoreData({ projectId: APP_ID })
    });

    // sleep tree seconds to allow triggers to run
    await sleep(3000);

    const doc = await db.collection('bar').doc('bar').get();

    expect(doc.data()).toBeUndefined()
}, 30000);