// routes/videoRoutes.js
import express from 'express';
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getUserVideos,
  searchVideosByTitle,
  filterByCategory,
  likeVideo,
  dislikeVideo,
} from '../controllers/videoController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/user', protect, getUserVideos);
router.get('/search', searchVideosByTitle);
router.get('/category/:cat', filterByCategory);
router.get('/:id', getVideoById);

router.post('/', protect, uploadVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);

export default router;
