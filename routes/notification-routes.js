const express = require('express');
const { 
    getNotifications,
    readNotification
} = require('../controllers/notification-controller');
const authorize = require('../middleware/role-middleware');

const router = express.Router();

router.get('/get-notifications', authorize("Employer"), getNotifications);
router.patch('/read-notification/:id/read', readNotification);

module.exports = router;