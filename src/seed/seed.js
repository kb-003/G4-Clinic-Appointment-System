require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI required in .env for seeding');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB for seeding');

    await Promise.all([Patient.deleteMany(), Doctor.deleteMany(), Appointment.deleteMany()]);

    const p1 = await Patient.create({ name: 'Alice Reyes', birthDate: '1990-05-15', email: 'alice@example.com', phone: '09171234567' });
    const p2 = await Patient.create({ name: 'Ben Cruz', birthDate: '1985-10-01', email: 'ben@example.com', phone: '09179876543' });

    const d1 = await Doctor.create({ name: 'Dr. Maria Santos', specialty: 'Cardiology' });
    const d2 = await Doctor.create({ name: 'Dr. John Lee', specialty: 'Dermatology' });

    await Appointment.create({
      patientId: p1._id,
      doctorId: d1._id,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24), 
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 25),
      notes: 'Initial consult'
    });

    await Appointment.create({
      patientId: p2._id,
      doctorId: d2._id,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 49),
      notes: 'Follow-up'
    });

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
