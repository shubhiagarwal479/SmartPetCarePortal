// ─────────────────────────────────────────────────────────────────────────────
//  PawCare Portal — server.js
//  Smart Record Validation & Update System
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config();
const express       = require("express");
const cors          = require("cors");
const session       = require("express-session");
const MongoStore    = require("connect-mongo");
const connectDB     = require("./config/db");

// ── Route Imports ─────────────────────────────────────────────────────────────
const authRoutes   = require("./routes/auth");
const visitRoutes  = require("./routes/visits");
const userRoutes   = require("./routes/users");

// ── Connect Database ──────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow React frontend
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,   // allow cookies/sessions
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Session with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || "pawcare_secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60   // 1 day
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000  // 1 day
  }
}));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",   authRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/users",  userRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status:    "ok",
    message:   "PawCare API is running",
    timestamp: new Date().toISOString(),
    env:       process.env.NODE_ENV
  });
});

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🐾 PawCare Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment : ${process.env.NODE_ENV}`);
  console.log(`🗄️  Database    : ${process.env.MONGO_URI}\n`);
});

module.exports = app;
