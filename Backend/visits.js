// routes/visits.js — Visit record: search, details, update (business rules enforced)

const express = require("express");
const router  = express.Router();
const Visit   = require("../models/Visit");
const { protect }                           = require("../middleware/auth");
const { searchRules, updateRules, validate } = require("../middleware/validate");

// ── POST /api/visits/search ───────────────────────────────────────────────────
// Search a visit using dual identifiers: visitId + ownerId
// PUBLIC — no login required (guests can search)
router.post("/search", searchRules, validate, async (req, res) => {
  try {
    const { visitId, ownerId } = req.body;

    const visit = await Visit.findOne({
      visitId: visitId.trim().toUpperCase(),
      ownerId: ownerId.trim().toUpperCase()
    });

    if (!visit) {
      // Return failure — record not found
      return res.status(404).json({
        success:    false,
        recordFound: false,
        message:    "No record found with the provided Visit ID and Owner ID."
      });
    }

    // Return full record details
    res.status(200).json({
      success:     true,
      recordFound: true,
      message:     "Record found successfully.",
      record: {
        visitId:     visit.visitId,
        ownerId:     visit.ownerId,
        petName:     visit.petName,
        petType:     visit.petType,
        breed:       visit.breed,
        ownerName:   visit.ownerName,
        ownerPhone:  visit.ownerPhone,
        visitDate:   visit.visitDate,
        visitTime:   visit.visitTime,
        serviceType: visit.serviceType,
        vetName:     visit.vetName,
        status:      visit.status,
        notes:       visit.notes,
        // Tell frontend upfront if update is allowed
        updateAllowed: visit.isUpdateAllowed()
      }
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Server error during search" });
  }
});

// ── GET /api/visits/:visitId ──────────────────────────────────────────────────
// Get single visit by visitId (for re-fetching after update)
router.get("/:visitId", async (req, res) => {
  try {
    const visit = await Visit.findOne({
      visitId: req.params.visitId.toUpperCase()
    });

    if (!visit) {
      return res.status(404).json({ success: false, message: "Visit not found" });
    }

    res.json({ success: true, record: visit });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── PUT /api/visits/:visitId/update ──────────────────────────────────────────
// Update visit record — BUSINESS RULE: only allowed when status = "confirmed"
// PROTECTED — must be logged in
router.put("/:visitId/update", protect, updateRules, validate, async (req, res) => {
  try {
    const { visitId } = req.params;
    const { visitTime, serviceType } = req.body;

    // Fetch the record
    const visit = await Visit.findOne({ visitId: visitId.toUpperCase() });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit record not found."
      });
    }

    // ── BUSINESS RULE CHECK ────────────────────────────────────────────────
    // Update is ONLY permitted when status is "confirmed"
    if (!visit.isUpdateAllowed()) {
      return res.status(403).json({
        success:      false,
        updateAllowed: false,
        message:      `Update not permitted. Status is "${visit.status}". Only confirmed bookings can be updated.`,
        currentStatus: visit.status
      });
    }

    // ── Only update permitted fields ───────────────────────────────────────
    // visitTime and serviceType are the only editable fields
    visit.visitTime   = visitTime.trim();
    visit.serviceType = serviceType.trim();
    await visit.save();

    res.status(200).json({
      success:      true,
      updateAllowed: true,
      message:      "Visit record updated successfully!",
      record: {
        visitId:     visit.visitId,
        ownerId:     visit.ownerId,
        petName:     visit.petName,
        visitTime:   visit.visitTime,
        serviceType: visit.serviceType,
        status:      visit.status,
        updatedAt:   visit.updatedAt
      }
    });
  } catch (error) {
    console.error("Update error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors:  messages
      });
    }

    res.status(500).json({ success: false, message: "Server error during update" });
  }
});

// ── GET /api/visits/ (Admin: list all visits) ─────────────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });
    res.json({ success: true, count: visits.length, visits });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
