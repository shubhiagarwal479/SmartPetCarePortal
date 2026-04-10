// config/seed.js — Seed sample pet visit records into MongoDB
// Run with: npm run seed

require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Visit    = require("../models/Visit");
const User     = require("../models/User");
const bcrypt   = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pawcare_db";

const sampleVisits = [
  {
    visitId:     "VIS001",
    ownerId:     "OWN101",
    petName:     "Buddy",
    petType:     "Dog",
    breed:       "Golden Retriever",
    ownerName:   "Rahul Sharma",
    ownerPhone:  "9876543210",
    visitDate:   new Date("2025-04-10"),
    visitTime:   "10:00 AM",
    serviceType: "Vaccination",
    vetName:     "Dr. Priya Nair",
    status:      "confirmed",
    notes:       "Annual shots due"
  },
  {
    visitId:     "VIS002",
    ownerId:     "OWN102",
    petName:     "Whiskers",
    petType:     "Cat",
    breed:       "Persian",
    ownerName:   "Ananya Iyer",
    ownerPhone:  "9123456780",
    visitDate:   new Date("2025-04-12"),
    visitTime:   "2:00 PM",
    serviceType: "Grooming",
    vetName:     "Dr. Karan Mehta",
    status:      "pending",
    notes:       "Nail trim + bath"
  },
  {
    visitId:     "VIS003",
    ownerId:     "OWN103",
    petName:     "Coco",
    petType:     "Rabbit",
    breed:       "Holland Lop",
    ownerName:   "Meera Pillai",
    ownerPhone:  "9988776655",
    visitDate:   new Date("2025-04-08"),
    visitTime:   "11:30 AM",
    serviceType: "Checkup",
    vetName:     "Dr. Priya Nair",
    status:      "cancelled",
    notes:       "Cancelled by owner"
  },
  {
    visitId:     "VIS004",
    ownerId:     "OWN104",
    petName:     "Mango",
    petType:     "Parrot",
    breed:       "African Grey",
    ownerName:   "Vikram Nair",
    ownerPhone:  "9001234567",
    visitDate:   new Date("2025-04-15"),
    visitTime:   "3:00 PM",
    serviceType: "Checkup",
    vetName:     "Dr. Karan Mehta",
    status:      "confirmed",
    notes:       "Wing trimming requested"
  },
  {
    visitId:     "VIS005",
    ownerId:     "OWN105",
    petName:     "Luna",
    petType:     "Dog",
    breed:       "Labrador",
    ownerName:   "Sneha Reddy",
    ownerPhone:  "9765432100",
    visitDate:   new Date("2025-04-18"),
    visitTime:   "9:00 AM",
    serviceType: "Dental Cleaning",
    vetName:     "Dr. Priya Nair",
    status:      "confirmed",
    notes:       "First dental visit"
  }
];

const sampleUsers = [
  { name: "Demo User",    email: "demo@pawcare.in",  password: "demo123" },
  { name: "Rahul Sharma", email: "rahul@example.com", password: "rahul123" }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing
    await Visit.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing records");

    // Insert visits
    await Visit.insertMany(sampleVisits);
    console.log(`✅ Inserted ${sampleVisits.length} visit records`);

    // Insert users with hashed passwords
    for (const u of sampleUsers) {
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashed });
    }
    console.log(`✅ Inserted ${sampleUsers.length} users`);

    console.log("\n🐾 Seed complete! Sample IDs:");
    console.log("   VIS001 + OWN101 (confirmed)");
    console.log("   VIS002 + OWN102 (pending)");
    console.log("   VIS003 + OWN103 (cancelled)");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
