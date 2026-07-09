const express = require('express');
const { 
    getNotifications,
    readNotification
} = require('../controllers/notification-controller');

const router = express.Router();

router.get('/get-notifications', getNotifications);
router.patch('/read-notification/:id', readNotification);

module.exports = router;