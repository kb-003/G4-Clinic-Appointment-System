require('dotenv').config();
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const patientsRoutes = require('./routes/patientRoutes');
const doctorsRoutes = require('./routes/doctorRoutes');
const appointmentsRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors()); // enable only when needed - you can set origin in options

// API prefix
app.use('/api/patients', patientsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Not found
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
