const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { getBalances, getBalanceWithUser } = require("../controllers/balanceController");

const router = express.Router();

router.use(authenticate);

router.get("/", getBalances);
router.get("/:otherUserId", getBalanceWithUser);

module.exports = router;