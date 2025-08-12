// models/Comment.js
import mongoose from 'mongoose';
// comment Model Schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
