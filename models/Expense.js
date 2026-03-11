const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define("Expense", {
  name: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  currency: DataTypes.STRING,
  date: DataTypes.DATE
});

module.exports = Expense;