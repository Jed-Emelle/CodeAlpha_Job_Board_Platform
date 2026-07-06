const expess = require('express');

const User = require('../models/User');
const Resume = require('../models/Resume');
const Job = require('../models/Job');
const Application = require('../models/Application');

const postApplication = async(req, res) => {
    try{
        const candidateId = req.userInfo.userId;
        const jobId = req.params.id;
        const { status } = req.body; 

        const resume = await Resume.findOne({ candidate: candidateId });

        if(!resume){
            return res.status(400).json({
                success: false,
                message: 'Resume needed! Upload a resume to continue'
            })
        }

        const existingApplication = await Application.findOne({
                candidate: candidateId,
                job: jobId,
                resume: resume._id 
            });

        if(existingApplication){
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job'
            })
        }

        const newApplication = new Application({
            candidate: candidateId,
            job: jobId,
            resume: resume
        })

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: 'Application successful'
        })

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const getAllApplications = async(req, res) => {
    try{
        const userId = req.userInfo.userId;
        const jobId = req.params.id;

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Cannot get the Job you want!'
            })
        }

        if(userId !== job.employer.toString()){
            return res.status(403).json({
                success: false,
                message: `Only the Employer that created this Job can view it's application!`
            })
        }

        const allApplications = await Application.find({jobId})
            // .populate("candidate", "fullName email companyName -_id")
            // .populate("job", "title description -_id");

        if (allApplications.length === 0) {
            return res.status(404).json({
            success: false,
            message: "No applications found for this job."
        });
        }

        res.status(200).json({
            success: true,
            message: 'Here are the Applications for your Job',
            data: allApplications
        })

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const getSingleApplication = async(req, res) => {
    try{

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const deleteApplication = async(req, res) => {
    try{

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

module.exports = {
    postApplication,
    getAllApplications,
    getSingleApplication,
    deleteApplication
};

// almost done with the getAll Applications. encountered and error 
// look into it and properly test the route