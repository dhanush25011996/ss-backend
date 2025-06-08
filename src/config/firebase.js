const admin = require("firebase-admin");
const credentials = require("../../firebase.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();
module.exports = { admin, db };
