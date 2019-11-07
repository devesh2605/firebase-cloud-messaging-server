const cloudMessaging = require('../controllers/cloudMessaging.controller');

module.exports = function (app) {

    app.post('/api/send/notification/', cloudMessaging.sendNotification);
}