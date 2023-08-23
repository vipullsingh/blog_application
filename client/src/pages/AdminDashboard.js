// // import React, { useState, useEffect } from 'react';
// // import BlogForm from '../components/Admin/BlogForm';
// // import { getAllBlogs, deleteBlogById } from '../services/api'; // Import deleteBlogById

// // const AdminDashboard = () => {
// //   const [blogs, setBlogs] = useState([]);
// //   const [selectedBlog, setSelectedBlog] = useState(null);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         const response = await getAllBlogs();
// //         setBlogs(response.data);
// //       } catch (error) {
// //         console.error('Error fetching blogs:', error);
// //       }
// //     };

// //     fetchBlogs();
// //   }, []);

// //   const handleDelete = async (blogId) => {
// //     try {
// //       await deleteBlogById(blogId);
// //       // Update the state by removing the deleted blog
// //       setBlogs(blogs.filter(blog => blog._id !== blogId));
// //       setSelectedBlog(null); // Clear the selected blog when a blog is deleted
// //       alert('Blog deleted successfully');
// //     } catch (error) {
// //       console.error('Error deleting blog:', error);
// //       alert('Failed to delete blog. Please try again.');
// //     }
// //   };

// //   const handleEdit = (blog) => {
// //     setSelectedBlog(blog);
// //   };

// //   return (
// //     <div>
// //       <h1>Admin Dashboard</h1>
// //       <BlogForm selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} />
// //       <h2>List of Blogs</h2>
// //       <ul>
// //         {blogs.map((blog) => (
// //           <li key={blog._id}>
// //             {blog.title}
// //             <button onClick={() => handleEdit(blog)}>Edit</button>
// //             <button onClick={() => handleDelete(blog._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
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
//             <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
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
import { getAllBlogs, deleteBlogById } from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BlogItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const BlogTitle = styled(Link)`
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  background-color: ${(props) => (props.danger ? '#ff6347' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${(props) => (props.danger ? '#d73a2a' : '#0056b3')};
  }
`;

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
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setSelectedBlog(null);
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
    <Container>
      <Title>Admin Dashboard</Title>
      <BlogForm selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} />
      <Title>List of Blogs</Title>
      <BlogList>
        {blogs.map((blog) => (
          <BlogItem key={blog._id}>
            <BlogTitle to={`/blogs/${blog._id}`}>{blog.title}</BlogTitle>
            <div>
              <Button onClick={() => handleEdit(blog)}>Edit</Button>
              <Button danger onClick={() => handleDelete(blog._id)}>
                Delete
              </Button>
            </div>
          </BlogItem>
        ))}
      </BlogList>
    </Container>
  );
};

export default AdminDashboard;
