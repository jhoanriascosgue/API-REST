import { Topic } from '../models/Topic.js';

export const createTopic = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const topic = await Topic.create({
      title,
      content,
      tags,
      author: req.user.userId
    });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('author', 'username');
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    if (topic.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    if (topic.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await topic.remove();
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};