const Report = require('../models/Report');

// Get all reports by status
const getReportsByStatus = async (req, res) => {
  try {
    // Extract status from the request parameters
    const { status } = req.params;

    // Find all reports with the given status
    const reports = await Report.find({ status });

    res.json({ reports });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getReportsByStatus,
};
