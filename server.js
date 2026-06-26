require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/DB')

connectDB();

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth');


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})