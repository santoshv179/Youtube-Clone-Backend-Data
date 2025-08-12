

import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { videoId } = req.params;

    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = await Comment.create({
      text,
      user: req.user._id,
      video: videoId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsForVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
      .populate('user', 'username _id') // Corrected: Include '_id' to properly identify the user
      .sort({ createdAt: -1 }); // latest first

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check if current user is the owner
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.text = text || comment.text;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check if current user is the owner
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};