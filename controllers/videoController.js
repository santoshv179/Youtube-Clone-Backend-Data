
import Video from '../models/Video.js';
import Channel from '../models/Channel.js';

// Upload Video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    const channel = await Channel.findOne({ user: req.user._id });// Check if user has a channel
    if (!channel) return res.status(400).json({ message: 'Create a channel first' });

    //create Video instance
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      user: req.user._id,
      channel: channel._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('channel', 'name').sort({ createdAt: -1 }); // Get all videos with channel name
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel', 'name');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.views += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Video

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);// Check if video exists
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    video.title = req.body.title || video.title;
    video.description = req.body.description || video.description;
    video.category = req.body.category || video.category;
    video.thumbnailUrl = req.body.thumbnailUrl || video.thumbnailUrl;

    const updated = await video.save();// Save the updated video
    res.json(updated);// Return the updated video
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Video

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get videos by user
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Search videos by title
export const searchVideosByTitle = async (req, res) => {
  try {
    const title = req.query.title || '';
    const videos = await Video.find({
      title: { $regex: title, $options: 'i' },
    }).populate('channel', 'name');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Filter videos by category
export const filterByCategory = async (req, res) => {
  try {
    const category = req.params.cat;
    const videos = await Video.find({ category }).populate('channel', 'name');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Like and Dislike Video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const userId = req.user._id.toString();

    // Remove dislike if exists
    video.dislikes = video.dislikes.filter(id => id.toString() !== userId);

    // Toggle like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res.json({ message: 'Like updated', likes: video.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const userId = req.user._id.toString();

    // Remove like if exists
    video.likes = video.likes.filter(id => id.toString() !== userId);

    // Toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    } else {
      video.dislikes.push(userId);
    }

    await video.save();
    res.json({ message: 'Dislike updated', dislikes: video.dislikes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
