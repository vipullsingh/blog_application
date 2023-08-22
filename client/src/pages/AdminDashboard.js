// import React, { useState, useEffect } from 'react';
// import BlogForm from '../components/Admin/BlogForm';
// import { getAllBlogs, deleteBlogById } from '../services/api'; // Import deleteBlogById

// const AdminDashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await getAllBlogs();
//         setBlogs(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (blogId) => {
//     try {
//       await deleteBlogById(blogId);
//       // Update the state by removing the deleted blog
//       setBlogs(blogs.filter(blog => blog._id !== blogId));
//       setSelectedBlog(null); // Clear the selected blog when a blog is deleted
//       alert('Blog deleted successfully');
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       alert('Failed to delete blog. Please try again.');
//     }
//   };

//   const handleEdit = (blog) => {
//     setSelectedBlog(blog);
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <BlogForm selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} />
//       <h2>List of Blogs</h2>
//       <ul>
//         {blogs.map((blog) => (
//           <li key={blog._id}>
//             {blog.title}
//             <button onClick={() => handleEdit(blog)}>Edit</button>
//             <button onClick={() => handleDelete(blog._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogForm from '../components/Admin/BlogForm';
import { getAllBlogs, deleteBlogById } from '../services/api'; // Import deleteBlogById

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  const handleDelete = async (blogId) => {
    try {
      await deleteBlogById(blogId);
      // Update the state by removing the deleted blog
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      setSelectedBlog(null); // Clear the selected blog when a blog is deleted
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <BlogForm selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} />
      <h2>List of Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
