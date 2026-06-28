require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Candidate", "Employer", "Admin"],
        required: true,
        default: 'Candidate'
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
    }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);