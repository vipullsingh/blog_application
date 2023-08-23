import React, { useState, useEffect } from 'react';
import { createBlog, updateBlogById } from '../../services/api';
import styled from 'styled-components';
const client = require('filestack-js').init('AMT8U5pVnRda2PsNkuCLlz');

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Align labels to the center */
`;

const FormLabel = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  align-self: flex-end; /* Justify input fields to the end */
`;

const FormTextarea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  align-self: flex-end; /* Justify textarea fields to the end */
`;

const FormButton = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

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


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBlogData({
      ...blogData,
      image: file,
    });
  };

  const handleUpload = async () => {
    if (blogData.image) {
      try {
        const uploadResult = await client.upload(blogData.image);
        const imageURL = uploadResult.url;
        console.log("Image Link : ",imageURL)
        return imageURL; // Return the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const uploadedImageURL = await handleUpload(); // Upload the image if selected
      console.log(uploadedImageURL)
      alert(uploadedImageURL)
      if (selectedBlog) {
        await updateBlogById(selectedBlog._id, {
          ...blogData,
          url: uploadedImageURL, // Include the image URL in the update data
        });
        alert('Blog updated successfully!');
        setSelectedBlog(null); // Clear selected blog after update
      } else {
        await createBlog({
          ...blogData,
          url: uploadedImageURL, // Include the image URL in the creation data
        });
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
    <FormContainer>
      <FormTitle>{selectedBlog ? 'Edit Blog' : 'Create a New Blog'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Content</FormLabel>
          <FormTextarea
            name="content"
            value={blogData.content}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        {/* <FormGroup>
          <FormLabel>URL</FormLabel>
          <FormInput
            type="url"
            name="url"
            value={blogData.url}
            onChange={handleInputChange}
          />
        </FormGroup> */}
        <FormGroup>
          <FormLabel>Image</FormLabel>
          <FormInput
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => handleFileChange(event)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormTextarea
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormButton type="submit">
          {selectedBlog ? 'Update Blog' : 'Create Blog'}
        </FormButton>
      </Form>
    </FormContainer>
  );
};

export default BlogForm;
