require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/DB');

const authRoutes = require('./routes/auth-routes');
const jobRoutes = require('./routes/job-routes');
const resumeRoutes = require('./routes/resume-routes');
const applicationRoutes = require('./routes/application-routes');

const authMiddlware = require('./middleware/auth-middleware');
const isCandidateMiddleware = require('./middleware/candidate-middleware');

connectDB();

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddlware, jobRoutes);
app.use('/api/resume', authMiddlware, isCandidateMiddleware, resumeRoutes);
app.use('/api/application', authMiddlware, applicationRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})