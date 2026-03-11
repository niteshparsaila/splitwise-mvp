const { ExpenseParticipant } = require("../models");

exports.getBalances = async (req, res) => {
  const balances = await ExpenseParticipant.findAll({
    where: { userId: req.userId }
  });

  res.json(balances);
};

exports.getBalanceWithUser = async (req, res) => {
  const balances = await ExpenseParticipant.findAll({
    where: {
      userId: req.params.otherUserId
    }
  });

  res.json(balances);
};