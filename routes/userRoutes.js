const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserExpenses
} = require("../controllers/userController");

const router = express.Router();

router.use(authenticate);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/profile", deleteAccount);
router.get("/expenses", getUserExpenses);

module.exports = router;