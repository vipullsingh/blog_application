const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Like a blog (requires authentication)
router.post('/:blogId/like', authMiddleware, userController.likeBlog);

// UnLike a blog (requires authentication)
router.post('/:blogId/unlike', authMiddleware, userController.unlikeBlog);

// Comment on a blog (requires authentication)
router.post('/:blogId/comment', authMiddleware, userController.commentOnBlog);

// Comment on a blog (requires authentication)
router.get('/:blogId/comments', authMiddleware, userController.getAllComments);

// Share a blog (requires authentication)
router.post('/:blogId/share', authMiddleware, userController.shareBlog);

module.exports = router;
