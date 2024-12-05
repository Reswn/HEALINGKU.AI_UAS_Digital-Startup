const express = require("express");
const {
  getUsers,
  createUser,
  getUserByUsername,
  updateUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:username", getUserByUsername);
router.put("/users/:username", updateUser); // Route to update user by username
router.post("/login", loginUser);

module.exports = router;
