const express = require('express');
const {
    postApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication
} = require('../controllers/application-controller');
const authorize = require('../middleware/role-middleware');

const router = express.Router();

// routes
router.post('/apply/:id', authorize("Candidate"), postApplication);
router.get('/get-all/:id/applications', authorize("Employer"), getAllApplications);
router.get('/get/:applicationId', getSingleApplication);
router.patch('/update/:id/status', authorize("Employer"), updateApplication);
router.delete('/delete/:jobId/:applicationId', authorize("Employer"), deleteApplication);

module.exports = router;