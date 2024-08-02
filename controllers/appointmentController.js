const { Appointment, Patient } = require('../models');
const s3Controller = require('../controllers/s3Controller');
const db = require('./db.js');

const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    s3Controller.uploadJsonToS3(appointment,"healthcaredata/appointments/appointment-id-"+appointment.id+".json");
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: Patient });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppointmentsbyPatientId = async (req, res) => {
 // Controller to handle fetching appointments by patient ID
  const { patientId } = req.params;

  try {
    const query = 'SELECT * FROM "Appointments" WHERE "patientId" = $1 ORDER BY "id" ASC';
    const { rows } = await db.query(query, [patientId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient.' });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAppointment,getAllAppointments,getAllAppointmentsbyPatientId,deleteAppointment };
