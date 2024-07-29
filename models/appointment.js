module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {});
    
    Appointment.associate = function(models) {
      // Associations can be defined here
      Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
    };
    
    return Appointment;
  };
  