const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    url: String,
    description: String,
    author: {              // Add the 'author' field to the schema
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',         // Assuming you have a 'User' model
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    shares: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  }, {
    timestamps: true,
  });
  

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
