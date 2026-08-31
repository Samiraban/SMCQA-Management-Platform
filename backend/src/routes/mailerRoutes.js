import express from "express";
import { replyByEmail } from "../controllers/mailerController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only a logged-in admin can send a reply email to a customer.
router.post("/reply", protect, adminOnly, replyByEmail);

export default router;