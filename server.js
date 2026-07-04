require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/DB');
const authRoutes = require('./routes/auth-routes');
const jobRoutes = require('./routes/job-routes');

const authMiddlware = require('./middleware/auth-middleware');

connectDB();

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddlware, jobRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})