const express = require('express');
const {
    createJob,
    getAllJobs,
    getJobById,
    deleteJob
} = require('../controllers/job-controller');

const authorize = require('../middleware/role-middleware');

const router = express.Router();

router.post('/create-job', authorize("Employer"), createJob);
router.get('/get-jobs', getAllJobs);
router.get('/get-job/:id', getJobById);
router.delete('/delete-job/:id', authorize("Employer"), deleteJob);

module.exports = router;