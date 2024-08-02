module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Patient.associate = function(models) {
    // Associations can be defined here
    Patient.hasMany(models.Appointment, { foreignKey: 'patientId' });
  };
  
  return Patient;
};
