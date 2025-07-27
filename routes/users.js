import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const router = express.Router();

// Debug route to ensure users.js is wired
router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ message: "Users route is working!" });
});

// Register route
router.post("/register", async (req, res) => {
  console.log("REGISTER ROUTE HIT");
  console.log("Request body:", req.body);

  try {
    const user = await User.create(req.body);
    console.log("User created:", user.email);

    const token = signToken(user);
    console.log("Token created for user");

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  console.log("LOGIN ROUTE HIT");
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    console.warn("Login failed: user not found");
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);
  if (!correctPw) {
    console.warn("Login failed: wrong password");
    return res.status(400).json({ message: "Wrong password!" });
  }

  const token = signToken(user);
  console.log("Login successful for:", user.email);
  res.json({ token, user });
});

export default router;
