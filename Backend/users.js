// routes/users.js — User profile management

const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { protect } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// ── GET /api/users/profile ────────────────────────────────────────────────────
// Get logged-in user's profile
router.get("/profile", protect, async (req, res) => {
  res.json({
    success: true,
    user: {
      id:        req.user._id,
      name:      req.user.name,
      email:     req.user.email,
      role:      req.user.role,
      createdAt: req.user.createdAt
    }
  });
});

// ── PUT /api/users/profile ────────────────────────────────────────────────────
// Update name (email is immutable for simplicity)
router.put(
  "/profile",
  protect,
  [body("name").trim().notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name: req.body.name },
        { new: true, runValidators: true }
      );
      res.json({
        success: true,
        message: "Profile updated successfully",
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
