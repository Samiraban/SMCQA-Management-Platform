import express from 'express';
import {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getGalleryItems);

// Protected routes
router.post('/', protect, createGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

export default router;