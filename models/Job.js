const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: [
            "Full-time",
            "Part-time",
            "Contract",
            "Internship",
            "Remote"
        ],
        required: true
    },

    salary: Number,

    experienceLevel: String,

    skills: [String],

    applicationDeadline: Date,

    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.Schema('Job', jobSchema);