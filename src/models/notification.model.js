const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true,
        default: 'common_topic'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });

module.exports = mongoose.model('NotificationSchema', NotificationSchema);