import React, { useState, useEffect } from 'react';
import Blog from '../components/User/Blog';
import { getAllBlogs } from '../services/api';

const Feed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>User Feed</h1>
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Feed;
