const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a doctor
exports.registerDoctor = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;
// Chect if Username or password filed is empty
    if (!username || !password) {
      return res.status(404).json({ message: 'Username or Password is Empty' });
    }
 // Check if a doctor with the same username already exists
 const existingDoctor = await Doctor.findOne({ username });
 if (existingDoctor) {
   return res.status(400).json({ error: 'Doctor already exists' });
 }
 // Hash the password
 const hashedPassword = await bcrypt.hash(password, 10);
 // Create a new doctor
 const newDoctor = await Doctor.create({ username, password: hashedPassword });
 res.json({ message: 'Doctor registered successfully', doctor: newDoctor });
} catch (error) {
 res.status(500).json({ error: 'Internal server error' });
}
};

// Doctor login
exports.loginDoctor = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;
 // Find the doctor by username
    const doctor = await Doctor.findOne({ username });
// Check if the doctor exists and the password is correct
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
 // Generate a JWT
    const token = generateToken(doctor._id);

    res.json({ message: 'Doctor logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Generate a JWT
const generateToken = (doctorId) => {
  return jwt.sign({ doctorId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
