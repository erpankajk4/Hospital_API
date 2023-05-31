const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');

// Register a doctor
const registerDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

 // Check if username or password is empty
 if (!username || !password) {
    return res.status(400).json({ error: 'Username or password is empty' });
  }

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
    res.status(500).json({ error: 'Internal server error', error });
  }
};

// Login a doctor
const loginDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

    const doctor = await Doctor.findOne({ username });

    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

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

module.exports = {
  registerDoctor,
  loginDoctor,
};
