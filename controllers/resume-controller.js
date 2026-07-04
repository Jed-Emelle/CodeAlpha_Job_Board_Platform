const fs = require("fs/promises");

const Resume = require("../models/Resume");
const uploadToCloudinary = require("../helpers/cloudinary-helper");
const cloudinary = require("../config/cloudinary");

const postResume = async (req, res) => {
    try {
        const candidateId = req.userInfo.userId;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume."
            });
        }

        const existingResume = await Resume.findOne({
            candidate: candidateId
        });

        if (existingResume) {
            return res.status(400).json({
                success: false,
                message: "Resume already exists. Delete it first or update it."
            });
        }

        const uploadResult = await uploadToCloudinary(req.file.path);

        const resume = await Resume.create({
            candidate: candidateId,
            resumeUrl: uploadResult.url,
            publicId: uploadResult.publicId,
            fileName: req.file.originalname
        });

        await fs.unlink(req.file.path);

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully.",
            data: resume
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
};

const deleteResume = async (req, res) => {
    try {
        const candidateId = req.userInfo.userId;

        const resume = await Resume.findOne({
            candidate: candidateId
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });
        }

        await cloudinary.uploader.destroy(resume.publicId);

        await resume.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully."
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. ${e.message}`
        });
    }
};

module.exports = {
    postResume,
    deleteResume
};