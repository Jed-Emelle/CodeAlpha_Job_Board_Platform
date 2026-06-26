require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async() => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected Successfully!')
    } catch(e){
        console.log(e)
    }
}

module.exports = connectDB;