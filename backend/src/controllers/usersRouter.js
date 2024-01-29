const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (!(password && email && username)) {
    return res.status(400).json({ message: "Missing credentials." });
  } else if (password.length < 5 || email.length < 5) {
    return res.status(400).json({
      message: "Password and email should be at least 5 characters long.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists." });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, passwordHash });
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json({ error: "Error during registration." });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Wrong credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrongg credentials." });
    }

    res.status(200).json({
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: "Error during logging in." });
  }
});

module.exports = usersRouter;
