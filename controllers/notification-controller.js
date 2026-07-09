const express = require('express');
const Notification = require('../models/Notifications');

const getNotifications = async(req, res) => {
    try {


    } catch(e){
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const readNotification = async(req, res) => {
    try {
       

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

// still working on the notifications functionality