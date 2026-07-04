const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    resumeUrl: {
        type: String,
        required: true
    },

    publicId: {
        type: String,
        required: true
    },

    fileName: String

}, { timestamps: true })


module.exports = mongoose.model('Resume', resumeSchema); 