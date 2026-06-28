require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const express = require('express');

const registerUser = async(req, res) => {
    try{        
        const { 
                fullName,
                email,
                password,
                role,
                phone, 
                location, 
                companyName, 
                profilePicture 
            } = req.body;

        const existingUser = await User.findOne({ $or: [{fullName}, {email}]});
        if(existingUser){
            return res.status(404).json({
                success: false,
                message: 'User with credentials exist already!'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash( password, salt );

        const newCreatedUser = new User({
            fullName,
            email,
            password : hashedPassword,
            role : role || 'Candidate',
            phone,
            location,
            companyName,
            profilePicture
        });

        await newCreatedUser.save();

        if(!newCreatedUser){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong. Please Try again!'
            })
        }

        res.status(201).json({
                success: true,
                message: 'User Successfully Registered!'
        })
        
    } catch(e){ 
        console.log(`An Error occurred: ${e.message}`)
        res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

const loginUser = async(req, res) => {
    try{
        const { fullName, password } = req.body;

        const user = await User.findOne({ fullName });

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Incorrect Credentials, Please try again!'
            })
        }

        const isPasswordMatch = await bcrypt.compare( password, user.password );
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Password is Incorrect!'
            })
        }

        const accessToken = jwt.sign({
            userId: user._id,
            fullName : fullName,
            email: user.email,
            role : user.role || 'Candidate',
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30m'
        });

        res.status(200).json({
            success: true,
            message: 'User Successfully Logged in',
            accessToken
        })


    } catch(e){
        console.log(`An Error occurred: ${e.message}`)
        res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

module.exports = {
    registerUser,
    loginUser
};