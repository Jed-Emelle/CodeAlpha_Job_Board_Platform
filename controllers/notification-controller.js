const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const employerId = req.userInfo.userId;

        const notifications = await Notification.find({
            recipient: employerId,
            isRead: false
        })
            .populate("sender", "fullName email")
            .populate("job", "title")
            .sort({ createdAt: -1 });

        if(!notifications || notifications.length === 0){
            return res.status(200).json({
                success: true,
                message: "No unread notifications"
            })
        };

        res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const readNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if(!notification){
            return res.status(404).json({
                success: false,
                message: `You don't have any notifications`
            })
        };

        if (notification.recipient.toString() !== req.userInfo.userId) {
            return res.status(403).json({
                success: false,
                message: "Only the Job Employer can read it's notifications!",
            });
        }

        if(notification.isRead === true){
            return res.status(400).json({
                success: false,
                message: 'You have already read this notification'
            })
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getNotifications,
    readNotification
}