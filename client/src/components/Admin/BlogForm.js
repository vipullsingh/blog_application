import React, { useState, useEffect } from 'react';
import { createBlog, updateBlogById } from '../../services/api';

const BlogForm = ({ selectedBlog, setSelectedBlog }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    url: '',
    description: '',
  });

  useEffect(() => {
    if (selectedBlog) {
      setBlogData({
        title: selectedBlog.title,
        content: selectedBlog.content,
        url: selectedBlog.url || '',
        description: selectedBlog.description || '',
      });
    }
  }, [selectedBlog]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedBlog) {
        await updateBlogById(selectedBlog._id, blogData);
        alert('Blog updated successfully!');
        setSelectedBlog(null); // Clear selected blog after update
      } else {
        await createBlog(blogData);
        alert('Blog created successfully!');
      }
      // Clear form fields after successful creation/update
      setBlogData({
        title: '',
        content: '',
        url: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating/updating blog:', error);
      alert('Blog creation/updating failed. Please try again.');
    }
  };

  return (
    <div className="blog-form">
      <h2 className="form-title">{selectedBlog ? 'Edit Blog' : 'Create a New Blog'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleInputChange}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">URL</label>
          <input
            type="url"
            name="url"
            value={blogData.url}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-button">
          {selectedBlog ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
