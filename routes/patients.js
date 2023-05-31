const express = require('express');
const router = express.Router();
const auth = require('../auth');

const patientController = require('../controllers/patientController');

// Register a patient
router.post('/register', patientController.registerPatient);

// Create a report for a patient
router.post('/:id/create_report', auth, patientController.createReport);

// Get all reports of a patient
router.get('/:id/all_reports', auth, patientController.getAllReports);

module.exports = router;
