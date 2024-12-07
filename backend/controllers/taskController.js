const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.query();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, priority, due_date, user_id } = req.body;
    const task = await Task.query().insert({
      title,
      priority,
      due_date,
      user_id,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.query().deleteById(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
};
