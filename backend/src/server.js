import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

import {
  seedDefaults,
} from "./controllers/contentController.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "http://localhost:5173";


/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "2mb",
  })
);


/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SMCQA Backend API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SMCQA API is healthy",
  });
});


/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/content", contentRoutes);


/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});


/* =========================
   ADMIN SETUP
========================= */

async function ensureAdmin() {
  const email = (
    process.env.ADMIN_EMAIL ||
    "admin@smcqa.com"
  ).toLowerCase();

  const password =
    process.env.ADMIN_PASSWORD ||
    "Admin@12345";

  let user = await User.findOne({
    email,
  });

  if (!user) {
    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      name: "SMC Administrator",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log(
      `Admin created: ${email}`
    );
  } else {
    if (user.role !== "admin") {
      user.role = "admin";
    }

    if (!user.isActive) {
      user.isActive = true;
    }

    await user.save();

    console.log(
      `Admin account ready: ${email}`
    );
  }
}


/* =========================
   START SERVER
========================= */

async function startServer() {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start HTTP server immediately
    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `SMCQA backend running on port ${PORT}`
        );

        console.log(
          `Frontend allowed: ${FRONTEND_URL}`
        );
      }
    );

    // Run setup tasks after server starts
    try {
      await ensureAdmin();

      await seedDefaults();

      console.log(
        "Initial setup completed successfully"
      );
    } catch (setupError) {
      console.error(
        "Initial setup error:",
        setupError
      );
    }

  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();