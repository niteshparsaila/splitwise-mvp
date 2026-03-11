const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    expenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Expenses',
        key: 'id'
      }
    },
    action: {
      type: DataTypes.ENUM('created', 'updated', 'deleted'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true
  });

  return ActivityLog;
};