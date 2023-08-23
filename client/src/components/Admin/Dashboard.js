import React from 'react';
import BlogForm from './BlogForm'; 
import { getAllBlogs } from '../../services/api';

const AdminDashboard = () => {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
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
      <h1>Admin Dashboard</h1>
      <BlogForm />
      <h2>List of Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
