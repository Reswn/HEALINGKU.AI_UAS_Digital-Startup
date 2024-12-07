const express = require("express");
const {
  getBudget,
  createBudget,
  addExpense,
} = require("../controllers/budgetController");

const router = express.Router();

router.get("/budgets/:userId", getBudget);
router.post("/budgets", createBudget);
router.post("/expenses", addExpense);

module.exports = router;
