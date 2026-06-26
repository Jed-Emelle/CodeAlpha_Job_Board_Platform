require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Candidate", "Employer", "Admin"],
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: function() {
            return this.role === "Employer"
        }
    },

    profilePicture: {
        url: String,
        publicId: String
    }

}, { timestamps: true })


module.exports = mongoose.Schema('User', userSchema);