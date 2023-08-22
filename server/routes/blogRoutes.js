const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new blog (requires authentication)
router.post('/', authMiddleware, blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID (requires authentication)
router.put('/:id', authMiddleware, blogController.updateBlog);

// Delete a blog by ID (requires authentication)
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
