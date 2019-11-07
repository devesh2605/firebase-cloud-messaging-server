var admin = require("firebase-admin");
var serviceAccount = require("../config/cloud-messaging.json");
const config = require('../config/');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.FIREBASE_DATABASE_URL,
});

exports.sendNotification = async (req, res) => {
    try {
        const payLoad = {
            data: {
                extraTitle: req.body.title,
                extraMessage: req.body.message,
            },
            android: {
                priority: "high"
            },
            topic: req.body.topic
        };
        const response = await admin.firebaseAdmin.messaging().send(payLoad);
        if (response) {
            res.status(200).json({ 'message': 'Notification sent successfully' });
        } else {
            res.status(400).json({ 'message': 'Error in sending notification' });
        }
    } catch (e) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
};