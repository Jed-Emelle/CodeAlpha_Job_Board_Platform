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

    salary: {
        type: Number,
        required: true
    },

    experienceLevel: {
        type: String,
        enum: ['Intern', 'Intermediate', 'Expert']
    },

    skills: {
        type: String,
        required: true
    },

    applicationDeadline: {
        type: String,
        required: true
    },

    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema);

// Make sure to change the type for applicationDeadline to a Date