

import Channel from '../models/Channel.js'
import Video from '../models/Video.js'


// Create Channel
export const createChannel = async (req, res) => {
  try {
    const { name, description, website, location } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Channel name is required' })
    }

    const exists = await Channel.findOne({ user: req.user._id })
    if (exists) {
      return res.status(400).json({ message: 'User already has a channel' })
    }

    // Avatar and banner files (optional)
    // const avatar = req.files?.avatar?.[0]
    // const banner = req.files?.banner?.[0]

    const channel = await Channel.create({
      name,
      description,
      website,
      location,
      user: req.user._id,
      // avatarUrl: ...,
      // bannerUrl: ...,
    })

    res.status(201).json(channel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('user', 'username')
    res.json(channels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


//  Get My Channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ user: req.user._id })
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }
    res.json(channel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get Channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('user', 'username')
    if (!channel) return res.status(404).json({ message: 'Channel not found' })
    res.json(channel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get videos for a specific channel

export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.id })
    res.json(videos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update Channel
export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ user: req.user._id })
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }
    if (channel._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    channel.name = req.body.name || channel.name
    channel.description = req.body.description || channel.description
    channel.website = req.body.website || channel.website
    channel.location = req.body.location || channel.location
    const updated = await channel.save()
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete Channel
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ user: req.user._id })
    if (!channel || channel._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized or channel not found' })
    }
    await channel.deleteOne()
    res.json({ message: 'Channel deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Subscribe to a channel
export const subscribeChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
    if (!channel) return res.status(404).json({ message: 'Channel not found' })
    if (channel.subscribers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already subscribed' })
    }
    channel.subscribers.push(req.user._id)
    await channel.save()
    res.json({ message: 'Subscribed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Unsubscribe from a channel
export const unsubscribeChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
    if (!channel) return res.status(404).json({ message: 'Channel not found' })
    channel.subscribers = channel.subscribers.filter(
      (id) => id.toString() !== req.user._id.toString()
    )
    await channel.save()
    res.json({ message: 'Unsubscribed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}