const notification = require('../controllers/notification.controller');

module.exports = function (app) {

    app.get('/api/notification', notification.getNotifications);

    app.get('/api/notification/:id', notification.getNotificationById);

    app.post('/api/notification', notification.addNotification);

    app.put('/api/notification/:id', notification.updateNotification);

    app.delete('/api/notification/:id', notification.deleteNotification);

}