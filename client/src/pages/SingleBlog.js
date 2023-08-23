import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../services/api';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const BlogContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;

const BlogImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
  border-radius: 5px;
`;

const BlogVideo = styled.video`
  max-width: 100%;
  margin-top: 20px;
  border-radius: 5px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const SingleBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [renderAsVideo, setRenderAsVideo] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleImageError = () => {
    // If rendering as image failed, attempt to render as video
    setRenderAsVideo(true);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogContent>{blog.content}</BlogContent>
      {blog.url && !renderAsVideo && (
        <BlogImage src={blog.url} alt={blog.title} onError={handleImageError} />
      )}
      {((blog.url && blog.contentType && blog.contentType.startsWith('video')) || renderAsVideo) && (
        <BlogVideo controls>
          <source src={blog.url} type={blog.contentType} />
          Your browser does not support the video tag.
        </BlogVideo>
      )}
      <Description>{blog.description}</Description>
    </BlogContainer>
  );
};

export default SingleBlog;
