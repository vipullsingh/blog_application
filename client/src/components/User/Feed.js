import React, { useState, useEffect } from 'react';
import Blog from '../components/User/Blog';
import { getAllBlogs } from '../services/api';
import styled from 'styled-components';

const FeedContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FeedTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BlogCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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
    <FeedContainer>
      <FeedTitle>User Feed</FeedTitle>
      <BlogList>
        {blogs.map((blog) => (
          <BlogCard key={blog._id}>
            <Blog blog={blog} />
          </BlogCard>
        ))}
      </BlogList>
    </FeedContainer>
  );
};

export default Feed;
