const express = require('express');
const Notification = require('../models/Notifications');

const getNotifications = async(req, res) => {
    try {
        const userId = req.userInfo.userId;

        const notifications = await Notification.find({
            recipient: userId
        })
        .populate("sender", "fullName")
        .populate("job", "title location")
        .populate("application", "status")
        .sort({ createdAt: -1 });

        if(!notifications || notifications.length === 0){
            return res.status(404).json({
                success: false,
                message: "No notifications found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notifications retrieved successfully.",
            data: notifications
        });

    } catch(e){
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const readNotification = async(req, res) => {
    try {
        const userId = req.userInfo.userId;
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        // Ensure the notification belongs to the logged-in user
        if (notification.recipient.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this notification."
            });
        }

        // If it's already read
        if (notification.isRead) {
            return res.status(400).json({
                success: false,
                message: "Notification has already been marked as read."
            });
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            data: notification
        });

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: `Something went wrong. ${e.message}`
            });
        }
    }

module.exports = {
    getNotifications,
    readNotification
};