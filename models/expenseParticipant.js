const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ExpenseParticipant = sequelize.define("ExpenseParticipant", {
  share: DataTypes.FLOAT
});

module.exports = ExpenseParticipant;