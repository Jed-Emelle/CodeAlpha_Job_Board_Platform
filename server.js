require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/DB');

const authRoutes = require('./routes/auth-routes');
const jobRoutes = require('./routes/job-routes');
const resumeRoutes = require('./routes/resume-routes');
const applicationRoutes = require('./routes/application-routes');
const notificationRoutes = require('./routes/notification-routes');

const authMiddleware = require('./middleware/auth-middleware');
const isCandidate = require('./middleware/candidate-middleware');
const isEmployer = require('./middleware/employer-middleware');

connectDB();

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes);
app.use('/api/resume', authMiddleware, isCandidate, resumeRoutes);
app.use('/api/application', authMiddleware, applicationRoutes);
app.use('/api/notification', authMiddleware, isEmployer, notificationRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})