const express = require('express');
const {
    postApplication,
    getAllApplications,
    getSingleApplication,
    deleteApplication
} = require('../controllers/application-controller');
const isEmployer = require('../middleware/employer-middleware');

const router = express.Router();

// routes
router.post('/apply/:id', postApplication);
router.get('/get-all/:id/applications', isEmployer, getAllApplications);
router.get('/get/:applicationId', getSingleApplication);
router.delete('/delete/:jobId/:applicationId', isEmployer, deleteApplication);

module.exports = router;