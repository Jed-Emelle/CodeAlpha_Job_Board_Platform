const express = require('express');
const { 
    getNotifications,
    readNotification
} = require('../controllers/notification-controller');
const authorize = require('../middleware/role-middleware');

const router = express.Router();

router.get('/get-notifications', getNotifications);
router.patch('/notification/:id/read', readNotification);

module.exports = router;