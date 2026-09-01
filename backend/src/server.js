import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import mailerRoutes from "./routes/mailerRoutes.js";

import {
  seedDefaults,
} from "./controllers/contentController.js";

import { verifyMailer } from "./utils/mailer.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "https://smcqa-management-platform.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests without an Origin header
      // Example: Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      // Allow main production Vercel URL
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments
      if (
        /^https:\/\/smcqa-management-platform-[a-z0-9-]+\.vercel\.app$/.test(
          origin
        )
      ) {
        return callback(null, true);
      }

      console.log(
        "CORS blocked origin:",
        origin
      );

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);


/* =========================================================
   BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "2mb",
  })
);


/* =========================================================
   TEST ROUTES
========================================================= */

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


/* =========================================================
   API ROUTES
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/content",
  contentRoutes
);

app.use(
  "/api/mailer",
  mailerRoutes
);


/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});


/* =========================================================
   ADMIN SETUP
========================================================= */

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
      await bcrypt.hash(
        password,
        10
      );

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


/* =========================================================
   START SERVER
========================================================= */

async function startServer() {

  try {

    // Connect to MongoDB
    await connectDB();

    // Start HTTP server
    app.listen(
      PORT,
      "0.0.0.0",
      () => {

        console.log(
          `SMCQA backend running on port ${PORT}`
        );

        console.log(
          `Allowed production origin: https://smcqa-management-platform.vercel.app`
        );

      }
    );


    // Run initial setup
    try {

      await ensureAdmin();

      await seedDefaults();

      // Test the SMTP connection right away so a bad/missing
      // Gmail App Password shows up clearly in the logs instead
      // of failing silently on every enquiry/application form.
      await verifyMailer();

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