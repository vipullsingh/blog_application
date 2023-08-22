const Blog = require('../models/Blog');
const User = require('../models/User');

// Controller function to like a blog
const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user has already liked the blog
    const alreadyLiked = blog.likes.includes(req.user._id);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'You have already liked this blog' });
    }

    blog.likes.push(req.user._id);
    await blog.save();

    return res.status(200).json({ message: 'Blog liked successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to comment on a blog
const commentOnBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    blog.comments.push(comment);
    await blog.save();

    return res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to share a blog
const shareBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user has already shared the blog
    const alreadyShared = blog.shares.includes(req.user._id);
    if (alreadyShared) {
      return res.status(400).json({ message: 'You have already shared this blog' });
    }

    blog.shares.push(req.user._id);
    await blog.save();

    return res.status(200).json({ message: 'Blog shared successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to unlike a blog
const unlikeBlog = async (req, res) => {
    try {
      const { blogId } = req.params;
  
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Check if the user has already liked the blog
      const userIndex = blog.likes.indexOf(req.user._id);
      if (userIndex === -1) {
        return res.status(400).json({ message: 'You have not liked this blog' });
      }
  
      blog.likes.splice(userIndex, 1);
      await blog.save();
  
      return res.status(200).json({ message: 'Blog unliked successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  // Controller function to get all comments for a blog
const getAllComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate('comments.user', 'username'); // Populate the user field in comments with only the username
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comments = blog.comments.map(comment => ({
      user: comment.user.username, // Use the populated username
      text: comment.text,
      timestamp: comment.timestamp,
    }));

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  likeBlog,
  commentOnBlog,
  shareBlog,
  unlikeBlog,
  getAllComments
};
