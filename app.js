const express = require('express');
var path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const patientRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointments');
const indexRoutes = require('./routes/index');
const snsRoutes = require('./routes/sns');
const app = express();
const port = 2000;

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const sequelize = new Sequelize('postgres', 'postgres', 'seraserasera3', {
  host: 'db-postgress.cfyuwdv7dqod.us-east-1.rds.amazonaws.com',
  dialect: 'postgres'
});

const Patient = sequelize.define('Patient', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: 'Patients'
});

const Appointment = sequelize.define('Appointment', {
  reason_for_visit: {
    type: DataTypes.STRING
  },
  appointment_time: {
    type: DataTypes.JSON,
    allowNull: false
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id'
    }
  }
}, {
  tableName: 'Appointments'
});

// Define associations
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

sequelize.sync(); // Sync without force to avoid dropping tables
app.use('/',indexRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

//app.listen(port, () => {
//  console.log(`Server is running on http://localhost:${port}`);
//});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;