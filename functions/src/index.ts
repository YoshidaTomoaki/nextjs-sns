/*
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase! use Typescript!")
})
*/

const functions = require("firebase-functions")

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin")
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// --------For Algolia
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
import algoliasearch from "algoliasearch"

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
//const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "users"
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

exports.onUserCreated = functions.firestore
  .document("users/{uid}")
  .onCreate((snap: any, context: any) => {
    // Get the note document
    const user = snap.data()

    // Add an 'objectID' field which Algolia requires
    user.objectID = context.params.uid

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME)
    return index.saveObject(user)
})

// --------- for Algolia

// demo -------------
exports.helloWorld = functions.https.onRequest((request: any, response: any) => {
    response.send("Hello from Firebase!")
})

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req: any, res: any) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original: original })
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString())
})

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database
  .ref("/messages/{pushId}/original")
  .onCreate((snapshot: any, context: any) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val()
    console.log("Uppercasing", context.params.pushId, original)
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child("uppercase").set(uppercase)
})

// ------------ demo
