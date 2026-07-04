const express = require('express');
const {
    postResume,
    deleteResume
} = require('../controllers/resume-controller');

const upload = require("../middleware/upload-middleware");

const router = express.Router();

// routes

router.post('/resume-upload', upload.single("resume"), postResume);
router.delete('/resume-delete', deleteResume);

module.exports = router;