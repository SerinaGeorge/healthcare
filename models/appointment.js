module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      reason_for_visit: {
        type: DataTypes.STRING
      },
      appointment_time: {
        type: DataTypes.JSON,
        allowNull: false
      }
    }, {});
    
    Appointment.associate = function(models) {
      // Associations can be defined here
      Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
    };
    
    return Appointment;
  };
  