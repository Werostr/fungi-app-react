const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../utils/authentication");
const config = require("../utils/config");

usersRouter.get("/", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "fungi"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      fungi: user.fungi,
    });
  } catch (err) {
    console.log(err); // comes back here after token expires cause can't read req.user.email
  }
});

usersRouter.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    let errors = [];

    if (!(password && email && username)) {
      return res.status(400).json({ error: "Missing credentials." });
    }
    if (password.length < 7 || email.length < 5) {
      errors.push("shortPassword");
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) {
      errors.push("emailExists");
    }
    if (existingUsername) {
      errors.push("usernameExists");
    }
    if (errors.length !== 0) {
      return res.status(400).json(errors);
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, passwordHash });
    await newUser.save();
    return res.status(200).json("ok");
  } catch (e) {
    res.status(500).json({ error: "Error during registration." });
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Wrong credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong credentials." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      config.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      userId: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: "Error during logging in." });
  }
});

module.exports = usersRouter;
