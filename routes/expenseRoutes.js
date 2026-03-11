const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getActivityLog
} = require("../controllers/expenseController");

const router = express.Router();

router.use(authenticate);

router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/activity", getActivityLog);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;