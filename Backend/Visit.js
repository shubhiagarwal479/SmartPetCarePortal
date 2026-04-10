// models/Visit.js — Mongoose schema for pet care visit records

const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    // ── Identifiers (used for dual-key search) ─────────────────────────────
    visitId: {
      type:     String,
      required: [true, "Visit ID is required"],
      unique:   true,
      trim:     true,
      uppercase: true,
      match:    [/^VIS\d{3,}$/i, "Visit ID must match format VIS001"]
    },
    ownerId: {
      type:     String,
      required: [true, "Owner ID is required"],
      trim:     true,
      uppercase: true,
      match:    [/^OWN\d{3,}$/i, "Owner ID must match format OWN101"]
    },

    // ── Pet Information ────────────────────────────────────────────────────
    petName: {
      type:     String,
      required: [true, "Pet name is required"],
      trim:     true
    },
    petType: {
      type:     String,
      required: true,
      enum:     ["Dog", "Cat", "Rabbit", "Bird", "Parrot", "Fish", "Hamster", "Other"]
    },
    breed: {
      type:    String,
      trim:    true,
      default: "Unknown"
    },

    // ── Owner Information ──────────────────────────────────────────────────
    ownerName: {
      type:     String,
      required: [true, "Owner name is required"],
      trim:     true
    },
    ownerPhone: {
      type:  String,
      match: [/^\d{10}$/, "Phone must be 10 digits"]
    },

    // ── Visit Details ──────────────────────────────────────────────────────
    visitDate: {
      type:     Date,
      required: [true, "Visit date is required"]
    },
    visitTime: {
      type:     String,
      required: [true, "Visit time is required"],
      trim:     true
      // ✏️  EDITABLE field — can be updated when status = confirmed
    },
    serviceType: {
      type:     String,
      required: [true, "Service type is required"],
      enum:     ["Vaccination", "Grooming", "Checkup", "Dental Cleaning", "Surgery", "Deworming"],
      // ✏️  EDITABLE field — can be updated when status = confirmed
    },
    vetName: {
      type:  String,
      trim:  true
    },

    // ── Business Logic Field ───────────────────────────────────────────────
    status: {
      type:    String,
      enum:    ["confirmed", "pending", "cancelled", "completed"],
      default: "pending"
      // ⚠️  NON-EDITABLE via update API — controls edit permission
    },

    notes: {
      type:  String,
      trim:  true,
      default: ""
    }
  },
  {
    timestamps: true   // adds createdAt, updatedAt
  }
);

// ── Index for fast dual-key lookup ────────────────────────────────────────────
visitSchema.index({ visitId: 1, ownerId: 1 });

// ── Instance method: check if update is permitted ─────────────────────────────
visitSchema.methods.isUpdateAllowed = function () {
  return this.status === "confirmed";
};

module.exports = mongoose.model("Visit", visitSchema);
