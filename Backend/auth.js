// routes/auth.js — Authentication: signup, login, logout, session check

const express  = require("express");
const router   = express.Router();
const User     = require("../models/User");
const { protect }                              = require("../middleware/auth");
const { signupRules, loginRules, validate }    = require("../middleware/validate");

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
// Register a new user
router.post("/signup", signupRules, validate, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    // Create user (password is hashed in the model pre-save hook)
    const user = await User.create({ name, email, password });

    // Start session
    req.session.userId = user._id;

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
// Login existing user
router.post("/login", loginRules, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user (include password for comparison)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Start session
    req.session.userId = user._id;

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
// Destroy session
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Could not log out" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
// Get currently logged-in user (session check)
router.get("/me", protect, async (req, res) => {
  res.json({
    success: true,
    user: {
      id:    req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role
    }
  });
});

module.exports = router;
