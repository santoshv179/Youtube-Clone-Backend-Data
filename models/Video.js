// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: String,
  category: String,
  views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
export default Video;
