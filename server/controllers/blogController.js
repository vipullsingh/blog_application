const Blog = require('../models/Blog');
const User = require('../models/User');

const createBlog = async (req, res) => {
    try {
      const { title, content, url, description } = req.body;
  
      const newBlog = new Blog({
        title,
        dateCreated: new Date(), // Set the dateCreated to the current date and time
        content,
        url,
        description,
        likes: [],      // Default likes count is an empty array
        comments: [],   // Default comments count is an empty array
        shares: [],     // Default shares count is an empty array
      });
  
      // Attach the currently authenticated user to the blog's author
      newBlog.author = req.user._id;
  
      await newBlog.save();
  
      return res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Controller function to get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username'); // Populate author information

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('author', 'username');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, url, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        url,
        description,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!req.isAdmin) {
        return res.status(403).json({ message: 'You do not have permission to delete this blog' });
      }
  
      const deletedBlog = await Blog.findByIdAndDelete(id);
  
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
