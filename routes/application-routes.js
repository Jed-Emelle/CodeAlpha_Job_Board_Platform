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
router.get('/get-all/:id', isEmployer, getAllApplications);
router.get('/get/:id', getSingleApplication);
router.delete('/delete/:id', deleteApplication);

module.exports = router;