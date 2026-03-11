const { Expense, ExpenseParticipant } = require("../models");

exports.createExpense = async (req, res) => {
  const { name, amount, currency, participants } = req.body;

  const expense = await Expense.create({
    name,
    amount,
    currency,
    createdBy: req.userId
  });

  const share = amount / participants.length;

  for (let userId of participants) {
    await ExpenseParticipant.create({
      expenseId: expense.id,
      userId,
      share
    });
  }

  res.json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
};

exports.getExpenseById = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);
  res.json(expense);
};

exports.updateExpense = async (req, res) => {
  await Expense.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Expense updated" });
};

exports.deleteExpense = async (req, res) => {
  await Expense.destroy({ where: { id: req.params.id } });
  res.json({ message: "Expense deleted" });
};

exports.getActivityLog = async (req, res) => {
  const expenses = await Expense.findAll({
    order: [["createdAt", "DESC"]]
  });
  res.json(expenses);
};