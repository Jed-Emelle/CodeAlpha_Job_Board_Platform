const express = require('express');
const mongoose = require('mongoose');
const Job = require('../models/Job');


const createJob = async(req, res) => {
    try{
        const formData = req.body;

        const { title, location, description } = formData;

        const existingJob = await Job.findOne({ 
            employer,
            title, 
            location 
        });

        if(existingJob){
            return res.status(400).json({
                success: false,
                message: 'Such job exists already'
            })
        }

        const newFormData = new Job({
            ...formData,
            employer: req.userInfo.userId
        });
        await newFormData.save();

        res.status(201).json({
            success: true,
            message: 'Succesfully created a new Job opening'
        })


    } catch(e){
        res.status(400).json({
            success: false,
            message: `Something went wrong. Please try again. Error: ${e.message}`
        })
    }
}

const getAllJobs = async(req, res) => {
    try{
        const { title, experienceLevel, employmentType } = req.query;

        // filter logic
        const filter = {}

        if(title){
            filter.title = { $regex: title, $options: "i" };
        }

        if(experienceLevel){
            filter.experienceLevel = { $regex: experienceLevel, $options: "i" };
        }

        if(employmentType){
            filter.employmentType = { $regex: employmentType, $options: "i" };
        }

        const allJobs = await Job.find(filter);

        if(allJobs.length === 0){
            return res.status(400).json({
                success: false,
                message: 'No Jobs found'
            })
        }

        res.status(200).json({
            success: true,
            message: "These are the available Jobs",
            allJobs
        })

    } catch(e){
        res.status(400).json({
            success: false,
            message: `Something went wrong. Please try again. Error: ${e.message}`
        })
    }
}

const getJobById = async(req, res) => {
    try{
        const id = req.params.id;
        const singleJob = await Job.findById(id);

        if(!singleJob){
            return res.status(400).json({
                success: false,
                message: 'No Such job exist'
            })
        }

        res.status(200).json({
            success: true,
            data: singleJob
        })

    } catch(e){
        res.status(400).json({
            success: false,
            message: `Something went wrong. Please try again. Error: ${e.message}`
        })
    }
}

const deleteJob = async(req, res) => {
    try{
        const {id} = req.params.id;
        const userId = req.userInfo.userId;
    
        const singleJob = await Job.findById(id);

        if(!singleJob){
            return res.status(400).json({
                success: false,
                message: 'Could not find Job!'
            })
        }

        if(userId !== singleJob.employer.toString()){
            return res.status(403).json({
                success: false,
                message: 'Only the Employer that created this Job can delete it or make changed to it!'
            })
        }

        await singleJob.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Successfully deleted a Job'
        })


    } catch(e){
        res.status(400).json({
            success: false,
            message: `Something went wrong. Please try again. Error: ${e.message}`
        })
    }
}

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    deleteJob
}