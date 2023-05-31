// Enviornmental Variables
require('dotenv').config(".env");

const express = require('express');

// Connecting to the MongoDB database using Mongoose
const db = require('./config/mongoose');

// Creating an instance of the Express application
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// use express router
app.use('/', require('./routes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
