// ✅ File: backend/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const { submitResume, getResumes } = require('../controllers/resumeController');

router.post('/', submitResume);
router.get('/', getResumes);

module.exports = router;
