const express = require('express');
const {
    createJob,
    getAllJobs,
    getJobById,
    deleteJob
} = require('../controllers/job-controller');

const isEmployer = require('../middleware/employer-middleware');

const router = express.Router();

router.post('/create-job', isEmployer, createJob);
router.get('/get-jobs', getAllJobs);
router.get('/get-job/:id', getJobById);
router.delete('/delete-job', isEmployer, deleteJob); // not working for now

module.exports = router;