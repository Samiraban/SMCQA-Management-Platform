import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import { seedDefaults } from "./controllers/contentController.js";

dotenv.config();

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@smcqa.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "SMC Administrator",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log(`Admin created: ${email}`);
    return;
  }

  if (user.role !== "admin") user.role = "admin";
  if (!user.isActive) user.isActive = true;

  await user.save();

  console.log(`Admin account ready: ${email}`);
}

async function run() {
  try {
    await connectDB();

    await ensureAdmin();
    await seedDefaults();

    console.log("Seeding complete.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();