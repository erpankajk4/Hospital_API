const express = require('express');
const doctorsController = require('../controllers/doctorsController');

const router = express.Router();

router.post('/register', doctorsController.registerDoctor);
router.post('/login', doctorsController.loginDoctor);

module.exports = router;
