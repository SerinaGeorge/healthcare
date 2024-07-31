const { Appointment, Patient } = require('../models');
const s3Controller = require('../controllers/s3Controller');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    s3Controller.uploadJsonToS3(appointment,"healthcaredata/appointments/appointment-id-"+appointment.id+".json");
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: Patient });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const [updated] = await Appointment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAppointment = await Appointment.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedAppointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
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
