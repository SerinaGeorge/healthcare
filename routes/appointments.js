const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
console.log(appointmentController.getAllAppointmentsbyPatientId);
router.get('/:patientId',appointmentController.getAllAppointmentsbyPatientId);
//router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
