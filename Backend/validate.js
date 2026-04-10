// middleware/validate.js — express-validator rules for all routes

const { body, validationResult } = require("express-validator");

// ── Helper: run validations and return errors ─────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors:  errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// ── Auth validators ───────────────────────────────────────────────────────────
const signupRules = [
  body("name").trim().notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

const loginRules = [
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

// ── Visit search validators ───────────────────────────────────────────────────
const searchRules = [
  body("visitId")
    .trim().notEmpty().withMessage("Visit ID is required")
    .matches(/^VIS\d{3,}$/i).withMessage("Visit ID must match format VIS001"),
  body("ownerId")
    .trim().notEmpty().withMessage("Owner ID is required")
    .matches(/^OWN\d{3,}$/i).withMessage("Owner ID must match format OWN101")
];

// ── Visit update validators ───────────────────────────────────────────────────
const updateRules = [
  body("visitTime")
    .trim().notEmpty().withMessage("Visit time is required")
    .isLength({ min: 2, max: 20 }).withMessage("Visit time must be between 2–20 characters"),
  body("serviceType")
    .trim().notEmpty().withMessage("Service type is required")
    .isIn(["Vaccination", "Grooming", "Checkup", "Dental Cleaning", "Surgery", "Deworming"])
    .withMessage("Invalid service type")
];

module.exports = {
  validate,
  signupRules,
  loginRules,
  searchRules,
  updateRules
};
