const { User, Expense } = require("../models");

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.userId);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  await User.update(req.body, { where: { id: req.userId } });
  res.json({ message: "Profile updated" });
};

exports.deleteAccount = async (req, res) => {
  await User.destroy({ where: { id: req.userId } });
  res.json({ message: "Account deleted" });
};

exports.getUserExpenses = async (req, res) => {
  const expenses = await Expense.findAll({ where: { createdBy: req.userId } });
  res.json(expenses);
};