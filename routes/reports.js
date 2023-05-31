const express = require('express');
const router = express.Router();

const auth = require('../auth');

const reportController = require('../controllers/reportController');

// Get all reports by status
router.get('/:status',auth, reportController.getReportsByStatus);

module.exports = router;
