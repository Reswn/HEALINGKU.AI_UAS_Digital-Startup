const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
