// routes/commentRoutes.js

import express from 'express';
import {
  addComment,
  getCommentsForVideo,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a comment to a video (auth required)
router.post('/:videoId', protect, addComment);

// Get all comments for a video (public)
router.get('/:videoId', getCommentsForVideo);

// Update a comment (auth + only comment owner)
router.put('/:commentId', protect, updateComment);

// Delete a comment (auth + only comment owner)
router.delete('/:commentId', protect, deleteComment);

export default router;
