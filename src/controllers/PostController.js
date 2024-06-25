import PostModel from '../models/Post.js';
import mongoose from 'mongoose';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to retrieve tags',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const { sortBy = 'createdAt', sortOrder = 'desc', tag } = req.query;

    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrderValue };

    const filter = tag ? { tags: tag } : {};

    const posts = await PostModel.find(filter).populate('user').sort(sortOptions).exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to retrieve articles',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`Fetching post with ID: ${postId}`);

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true, 
      }
    ).populate('user');

    if (!doc) {
      console.log(`Post with ID ${postId} not found`);
      return res.status(404).json({
        message: 'Article not found',
      });
    }

    console.log(`Post found: ${doc}`);
    res.json(doc);
  } catch (err) {
    console.log(err);  
    res.status(500).json({
      message: 'Failed to retrieve article',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`Attempting to delete post with ID: ${postId}`);

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      console.log(`Post with ID ${postId} not found`);
      return res.status(404).json({ message: 'Article not found' });
    }

    console.log(`Post with ID ${postId} deleted successfully`);
    res.json({ success: true });

  } catch (err) {
    console.log('Error while deleting post:', err);
    res.status(500).json({ message: 'Failed to delete article' });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create article',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update article',
    });
  }
};

export const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await PostModel.find({ tags: tag }).populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to retrieve posts by tag',
    });
  }
};
