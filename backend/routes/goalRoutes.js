const express = require("express");
const {
  getGoals,
  createGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.get("/goals", getGoals);
router.post("/goals", createGoal);
router.delete("/goals/:id", deleteGoal);

module.exports = router;
