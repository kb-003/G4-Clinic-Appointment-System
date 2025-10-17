const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, startAt, endAt, notes } = req.body;
    if (!patientId || !doctorId || !startAt || !endAt) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [p, d] = await Promise.all([
      Patient.findById(patientId),
      Doctor.findById(doctorId)
    ]);
    if (!p || !d) return res.status(400).json({ message: 'Invalid patientId or doctorId' });

    // Optional: check for overlapping appointments
    const overlap = await Appointment.findOne({
      doctorId,
      startAt: { $lt: new Date(endAt) },
      endAt: { $gt: new Date(startAt) }
    });
    if (overlap) {
      return res.status(400).json({ message: 'Doctor has another appointment during this time' });
    }

    const appt = await Appointment.create({ patientId, doctorId, startAt, endAt, notes });
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single appointment (with patient and doctor info)
exports.getAppointment = async (req, res) => {
  try {
    const a = await Appointment.findById(req.params.id).populate('patientId doctorId');
    if (!a) return res.status(404).json({ message: 'Appointment not found' });
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List appointments (with filtering + pagination)
exports.listAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.doctor) filter.doctorId = req.query.doctor;
    if (req.query.patient) filter.patientId = req.query.patient;

    const [items, total] = await Promise.all([
      Appointment.find(filter).populate('patientId doctorId').skip(skip).limit(limit).sort({ startAt: -1 }),
      Appointment.countDocuments(filter)
    ]);

    res.json({ page, limit, total, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const data = (({ startAt, endAt, notes, patientId, doctorId }) => ({ startAt, endAt, notes, patientId, doctorId }))(req.body);
    const a = await Appointment.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!a) return res.status(404).json({ message: 'Appointment not found' });
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const a = await Appointment.findByIdAndDelete(req.params.id);
    if (!a) return res.status(404).json({ message: 'Appointment not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
