const Patient = require('../models/patientModel');

// Create patient
exports.createPatient = async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;
    if (!name || !birthDate || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const patient = await Patient.create({ name, birthDate, email, phone });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single patient
exports.getPatient = async (req, res) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all patients (with pagination and search)
exports.listPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const q = {};
    if (req.query.name) q.name = new RegExp(req.query.name, 'i');

    const [items, count] = await Promise.all([
      Patient.find(q).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Patient.countDocuments(q)
    ]);

    res.json({ page, limit, total: count, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const data = (({ name, birthDate, email, phone }) => ({ name, birthDate, email, phone }))(req.body);
    const p = await Patient.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const p = await Patient.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists. Please use another email.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
