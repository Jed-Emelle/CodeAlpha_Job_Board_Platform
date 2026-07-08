const express = require('express');
const {
    postApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication
} = require('../controllers/application-controller');
const isEmployer = require('../middleware/employer-middleware');
const isCandidate = require('../middleware/candidate-middleware');

const router = express.Router();

// routes
router.post('/apply/:id', postApplication);
router.get('/get-all/:id/applications', isEmployer, getAllApplications);
router.get('/get/:applicationId', getSingleApplication);
router.patch('/update/:id/status', isEmployer, updateApplication);
router.delete('/delete/:jobId/:applicationId', isEmployer, deleteApplication);

module.exports = router;