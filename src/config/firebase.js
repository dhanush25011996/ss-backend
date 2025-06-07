const admin = require("firebase-admin");
const credentials = require("../../firebase.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = admin;
