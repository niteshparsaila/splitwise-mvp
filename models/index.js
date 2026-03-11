const sequelize = require("../config/database");
const User = require("./user");
const Expense = require("./expense");
const ExpenseParticipant = require("./expenseParticipant");

User.hasMany(Expense, { foreignKey: "createdBy" });
Expense.belongsTo(User, { foreignKey: "createdBy" });

Expense.belongsToMany(User, {
  through: ExpenseParticipant,
  foreignKey: "expenseId"
});

User.belongsToMany(Expense, {
  through: ExpenseParticipant,
  foreignKey: "userId"
});

module.exports = { sequelize, User, Expense, ExpenseParticipant };