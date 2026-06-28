const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = require('../helpers/cloudinary-helper');
const Resume = require('../models/Resume');

const uploadImageController = async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({
                success: false, 
                message: 'File is required. Please upload a file'
            })
        }

        const { url, publidId } = await uploadToCloudinary(req.file.path);

        const newUpload = new Resume({
            candidate: req.userInfo.userId,
            resumeUrl: url,
            publicId: publidId,
            // fileName: 

        })

    } catch(e) {
        console.log('Something went wrong. Could not upload to cloudinary', e.message);
        res.status(400).json({
            success: false,
            message: `Something went wrong. Could not upload to cloudinary, Error: ${e.message}`
        })
    }
};


const deleteImageController = async(req, res) => {
    try{

    } catch(e) {
        console.log('Something went wrong. Could not upload to cloudinary', e.message);
        res.status(400).json({
            success: false,
            message: `Something went wrong. Could not upload to cloudinary, Error: ${e.message}`
        })
    }
};


module.exports = {
    uploadImageController,
    deleteImageController
};