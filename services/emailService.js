const nodemailer = require('nodemailer');
const { User, Participant, Expense, sequelize } = require('../models');
const { Op } = require('sequelize');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const generateBalanceReport = async (userId) => {
  const user = await User.findByPk(userId);
  
  // Get all balances for user
  const participants = await Participant.findAll({
    where: { userId },
    include: [
      {
        model: Expense,
        where: {
          date: {
            [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        include: [
          {
            model: Participant,
            include: [{ model: User, attributes: ['id', 'name'] }]
          }
        ]
      }
    ]
  });

  const balances = {};
  let totalOwed = 0;
  let totalOwes = 0;

  participants.forEach(participant => {
    const expense = participant.Expense;
    if (!expense) return;

    expense.Participants.forEach(p => {
      if (p.userId !== userId) {
        const share = parseFloat(p.share);
        
        if (expense.createdBy === userId) {
          balances[p.User.name] = (balances[p.User.name] || 0) + share;
          totalOwed += share;
        } else if (expense.createdBy === p.userId) {
          balances[p.User.name] = (balances[p.User.name] || 0) - share;
          totalOwes += share;
        }
      }
    });
  });

  return {
    user: user.name,
    email: user.email,
    month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    balances,
    summary: {
      totalOwed: Math.round(totalOwed * 100) / 100,
      totalOwes: Math.round(totalOwes * 100) / 100,
      netBalance: Math.round((totalOwed - totalOwes) * 100) / 100
    }
  };
};

exports.sendMonthlyReports = async () => {
  try {
    const users = await User.findAll({ where: { isActive: true } });

    for (const user of users) {
      const report = await generateBalanceReport(user.id);
      
      // Generate HTML email
      const htmlContent = `
        <h2>Monthly Balance Report - ${report.month}</h2>
        <p>Hello ${report.user},</p>
        <p>Here's your monthly balance summary:</p>
        
        <h3>Balances with others:</h3>
        <ul>
          ${Object.entries(report.balances).map(([name, amount]) => {
            const status = amount > 0 ? 'owes you' : 'you owe';
            return `<li>${name}: ${Math.abs(amount)} ${status}</li>`;
          }).join('')}
        </ul>
        
        <h3>Summary:</h3>
        <p>Total owed to you: ${report.summary.totalOwed}</p>
        <p>Total you owe: ${report.summary.totalOwes}</p>
        <p>Net balance: ${report.summary.netBalance}</p>
        
        <p>Thank you for using Splitwise!</p>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Monthly Balance Report - ${report.month}`,
        html: htmlContent
      });

      console.log(`Monthly report sent to ${user.email}`);
    }
  } catch (error) {
    console.error('Error sending monthly reports:', error);
  }
};