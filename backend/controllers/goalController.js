const Goal = require("../models/Goal");

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.query();
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createGoal = async (req, res) => {
  try {
    const { title, user_id } = req.body;
    const goal = await Goal.query().insert({
      title,
      user_id,
    });
    res.status(201).json(goal);
    console.log("Request Body:", req.body);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ message: "Internal server error" });
    console.log("Request Body:", req.body);
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    await Goal.query().deleteById(id);
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getGoals,
  createGoal,
  deleteGoal,
};
