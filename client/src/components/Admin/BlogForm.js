// import React, { useState } from 'react';
// import { createBlog } from '../../services/api';

// const BlogForm = () => {
//   const [blogData, setBlogData] = useState({
//     title: '',
//     content: '',
//     url: '',
//     description: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setBlogData({
//       ...blogData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await createBlog(blogData);
//       alert('Blog created successfully!');
//       // Clear form fields after successful creation
//       setBlogData({
//         title: '',
//         content: '',
//         url: '',
//         description: '',
//       });
//     } catch (error) {
//       console.error('Error creating blog:', error);
//       alert('Blog creation failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Create a New Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input type="text" name="title" value={blogData.title} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Content</label>
//           <textarea name="content" value={blogData.content} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>URL</label>
//           <input type="url" name="url" value={blogData.url} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea name="description" value={blogData.description} onChange={handleInputChange} />
//         </div>
//         <button type="submit">Create Blog</button>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;


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
    <div>
      <h2>{selectedBlog ? 'Edit Blog' : 'Create a New Blog'}</h2>
      <form onSubmit={handleSubmit}>
        {/* ... Form input fields */}
         <div>
           <label>Title</label>
           <input type="text" name="title" value={blogData.title} onChange={handleInputChange} required />
         </div>
         <div>
           <label>Content</label>
           <textarea name="content" value={blogData.content} onChange={handleInputChange} required />
         </div>
         <div>
           <label>URL</label>
           <input type="url" name="url" value={blogData.url} onChange={handleInputChange} />
         </div>
         <div>
           <label>Description</label>
           <textarea name="description" value={blogData.description} onChange={handleInputChange} />
         </div>
        <button type="submit">{selectedBlog ? 'Update Blog' : 'Create Blog'}</button>
      </form>
    </div>
  );
};

export default BlogForm;
