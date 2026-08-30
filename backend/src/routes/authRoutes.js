import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

// Test protected route
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    message: 'You are authenticated.',
    user: req.user,
  });
});

export default router;