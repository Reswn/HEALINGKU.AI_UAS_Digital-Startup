const Users = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await Users.query();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send(error.message);
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.query().findOne({ username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await Users.query().insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.query().findOne({ username });
    if (user) {
      const updatedUser = await Users.query().patchAndFetchById(
        user.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.query().findOne({ username });
    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  loginUser,
};
