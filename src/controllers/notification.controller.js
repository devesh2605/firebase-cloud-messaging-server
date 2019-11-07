const notification = require('../models/notification.model');
const ObjectId = require('mongodb').ObjectID;

/**Create a notification */
exports.addNotification = async (req, res) => {
    const singleNotification = new notification({
        title: req.body.title,
        message: req.body.title,
        topic: req.body.topic,
    });
    try {
        const response = await singleNotification.save();
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(400).json({ 'message': 'Error in adding notification' });
        }
    } catch (err) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
}

/**Fetch all notifications */
exports.getNotifications = async (req, res) => {
    try {
        let response = await notification.find({});
        if (response.length > 0) {
            res.status(200).json({ 'notifications': response });
        } else {
            res.status(404).json({ 'message': 'No notifications found' });
        }
    } catch (e) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
}

/** Fetch a notification by Id */
exports.getNotificationById = async (req, res) => {
    const id = req.params.id;
    try {
        let response = await notification.findOne({ _id: ObjectId(id) })
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ 'message': 'No notifications found' });
        }
    } catch (e) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
}

/** Update a notification */
exports.updateNotification = async (req, res) => {
    const id = req.params.id;
    try {
        let modified = await notification.findByIdAndUpdate({ _id: ObjectId(id) }, req.body, { new: true });
        if (modified) {
            res.status(200).json(modified);
        } else {
            res.status(404).json({ 'message': 'No notifications found' });
        }
    } catch (e) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
}

/** Delete a notification */
exports.deleteNotification = async (req, res) => {
    const id = req.params.id;
    try {
        let response = await notification.findByIdAndDelete({ _id: ObjectId(id) });
        if (response) {
            res.status(200).json({ 'message': 'Notification deleted successfully' });
        } else {
            logger.warn('No notifications found');
        }
    } catch (e) {
        res.status(500).json({ 'message': 'Internal server error' });
    }
}