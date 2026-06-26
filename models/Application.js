const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Reviewed",
            "Interview",
            "Accepted",
            "Rejected"
        ],
        default: "Pending"
    }
}, { timestamps: true })

module.exports = mongoose.Schema('Application', applicationSchema);