const User = require('../models/User');
const Resume = require('../models/Resume');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Notification = require('../models/Notification');

const postApplication = async(req, res) => {
    try{
        const candidateId = req.userInfo.userId;
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Job not found!'
            })
        }

        const resume = await Resume.findOne({ candidate: req.userInfo.userId });

        if(!resume){
            return res.status(400).json({
                success: false,
                message: 'Resume needed! Upload a resume to continue'
            })
        }

        const application = await Application.findOne({
                candidate: candidateId,
                job: jobId,
                resume: resume._id 
            });

        if(application){
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

        // creating a new notification
        const newNotification = await Notification({
            recipient: job.employer,
            sender: candidateId,
            job: job._id,
            application: newApplication._id,
            type: "NEW_APPLICATION",
            message: `${req.userInfo.fullName} has applied for a job as a ${job.title} at ${job.location}`,
        });

        await newNotification.save();

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
                message: 'Job not found.'
            })
        }

        if(userId !== job.employer.toString()){
            return res.status(403).json({
                success: false,
                message: `Only the Employer that created this Job can view it's application!`
            })
        }

        const allApplications = await Application.find({ job: jobId})
            .populate("candidate", "fullName email companyName -_id")
            .populate("job", "title description -_id");

        if (allApplications.length === 0) {
            return res.status(200).json({
            success: false,
            message: "No applications found for this job.",
            data: []
        });
        }

        res.status(200).json({
            success: true,
            message: 'Applications retrieved successfully.',
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
        const applicationId = req.params.applicationId;
        const candidate = req.userInfo.userId;

        const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                success: false,
                message: 'No application found'
            })
        }

        // if(application.candidate.toString() !== candidate){
        //     return res.status(403).json({
        //         success: false,
        //         message: 'You cannot view this Application!'
        //     })
        // }

        await application.populate("candidate", "fullName email -_id");
        await application.populate("job", "title location -_id");

        res.status(200).json({
            success: true,
            message: 'Application Retrieved successfully',
            data: application
        })

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const updateApplication = async(req, res) => {
    try{
        const { status } = req.body;
        const employer = req.userInfo.userId;
        const id = req.params.id;
        
        const application = await Application.findById(id).populate("job");

        if(!application){
            return res.status(404).json({
                success: false,
                message: 'No application found'
            })
        }

        if(employer !== application.job.employer.toString()){
            return res.status(403).json({
                success: false,
                message:`Only the Job Employer can update this Job's status!`
            })
        }

        if (application.status === status) {
            return res.status(400).json({
            success: false,  
            message: "Application is already in this status."
        });
}

        application.status = status;
 
        await application.save();

        res.status(200).json({
            success: true,
            message: "Successfully updated application status",
            data: application
        })

    } catch(e){
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
}

const deleteApplication = async(req, res) => {
    try{
        const jobId = req.params.jobId;
        const applicationId = req.params.applicationId
        const employerId = req.userInfo.userId;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Wrong param field!'
            })
        }

        if(job.employer.toString() !== employerId){
            return res.status(403).json({
                success: false,
                message: `Only the Employer that created this Job can delete it's application`
            })
        }

        const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                success: true,
                message: 'No application found'
            })
        }

        await application.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Application deleted Successfully!'
        })



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
    updateApplication,
    deleteApplication
};
