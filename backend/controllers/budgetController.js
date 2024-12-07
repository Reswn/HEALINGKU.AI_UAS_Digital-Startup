const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.query().findOne({ user_id: req.params.userId });
    console.log("Fetched budget:", budget);
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBudget = async (req, res) => {
  try {
    const { user_id, balance } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    const budget = await Budget.query().insert({
      user_id,
      balance,
    });
    res.status(201).json(budget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addExpense = async (req, res) => {
  try {
    const { budget_id, category, amount } = req.body;
    const expense = await Expense.query().insert({
      budget_id,
      category,
      amount,
    });
    const budget = await Budget.query().findById(budget_id);
    await Budget.query().patchAndFetchById(budget_id, {
      balance: budget.balance - amount,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getBudget,
  createBudget,
  addExpense,
};
