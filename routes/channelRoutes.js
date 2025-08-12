
import express from 'express';
import multer from 'multer';
import {
  createChannel,
  getAllChannels,
  getMyChannel,
  getChannelById,
  getChannelVideos,
  updateChannel,
  deleteChannel,
  subscribeChannel,
  unsubscribeChannel,
} from '../controllers/channelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer(); // memory storage

router.get('/', getAllChannels);
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createChannel
);
router.get('/me', protect, getMyChannel); 
router.get('/:id/videos', getChannelVideos);
router.put('/:id', protect, updateChannel);
router.delete('/:id', protect, deleteChannel);
router.post('/:id/subscribe', protect, subscribeChannel);
router.post('/:id/unsubscribe', protect, unsubscribeChannel);
router.get('/:id', getChannelById); 

export default router;