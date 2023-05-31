const Patient = require('../models/Patient');
const Report = require('../models/Report');

// Register a patient
const registerPatient = async (req, res) => {
  try {
    // Extract phoneNumber from the request body
    const { phoneNumber } = req.body;

    // Check if a patient with the same phoneNumber already exists
    const existingPatient = await Patient.findOne({ phoneNumber });
    if (existingPatient) {
      return res.status(400).json({ error: 'Patient already exists' });
    }

    // Create a new patient
    const newPatient = await Patient.create({ phoneNumber });

    res.json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a report for a patient
const createReport = async (req, res) => {
  try {
    // Extract patient ID and report details from the request body
    const { id } = req.params;
    const { doctorId, status } = req.body;

    // Check if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create a new report
    const newReport = await Report.create({ patient: id, doctor: doctorId, status });

    res.json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all reports of a patient
const getAllReports = async (req, res) => {
  try {
    // Extract patient ID from the request parameters
    const { id } = req.params;

    // Check if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Find all reports of the patient sorted by date in ascending order
    const reports = await Report.find({ patient: id }).sort({ date: 1 });

    res.json({ reports });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerPatient,
  createReport,
  getAllReports,
};
