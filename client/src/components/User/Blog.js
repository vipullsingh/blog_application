import React, { useState, useEffect } from 'react';
import { likeBlog, unlikeBlog, getAllComments, commentOnBlog, shareBlog } from '../../services/api';
import styled from 'styled-components';

const BlogContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const BlogImage = styled.img`
  max-width: 100%;
  margin: 10px 0;
`;

const BlogVideo = styled.video`
  max-width: 100%;
  margin: 10px 0;
`;

const BlogText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  font-size: 16px;
  padding: 8px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007bff' : '#ccc')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#aaa')};
  }
`;

const Blog = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(blog.likes.length);
  const [totalComments, setTotalComments] = useState(blog.comments.length);
  const [comments, setComments] = useState([]);
  const [renderAsVideo, setRenderAsVideo] = useState(false);


  useEffect(() => {
    setIsLiked(blog.likes.includes(localStorage.getItem('userId')));
    setTotalLikes(blog.likes.length);
    setTotalComments(blog.comments.length);

    const fetchComments = async () => {
      try {
        const response = await getAllComments(blog._id);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blog]);

  const handleImageError = () => {
    // If rendering as image failed, attempt to render as video
    setRenderAsVideo(true);
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike the blog
        await unlikeBlog(blog._id);
        setIsLiked(false);
        setTotalLikes(totalLikes - 1);
      } else {
        // Like the blog
        await likeBlog(blog._id);
        setIsLiked(true);
        setTotalLikes(totalLikes + 1);
      }
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  };

  const handleComment = async () => {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      try {
        await commentOnBlog(blog._id, { text: commentText });
        setTotalComments(totalComments + 1);

        // Fetch the new comment and prepend it to the comments array
        const response = await getAllComments(blog._id);
        const newComment = response.data[response.data.length - 1];
        setComments([newComment, ...comments]);
      } catch (error) {
        console.error('Error commenting on blog:', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      await shareBlog(blog._id);
    } catch (error) {
      console.error('Error sharing blog:', error);
    }
  };

  return (
    <BlogContainer>
      <BlogTitle>
        <a href={`/blogs/${blog._id}`}>{blog.title}</a>
      </BlogTitle>
      <BlogText>{blog.content}</BlogText>
      {/* {blog.url && <BlogImage src={blog.url} alt={blog.title}/>} */}
      {blog.url && !renderAsVideo && (
        <BlogImage src={blog.url} alt={blog.title} onError={handleImageError} />
      )}
      {((blog.url && blog.contentType && blog.contentType.startsWith('video')) || renderAsVideo) && (
        <BlogVideo controls>
          <source src={blog.url} type={blog.contentType} />
          Your browser does not support the video tag.
        </BlogVideo>
      )}
      <BlogText>{blog.description}</BlogText>
      <p>Total Likes: {totalLikes}</p>
      <p>Total Comments: {totalComments}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
      <ActionButton primary={isLiked} onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'}
      </ActionButton>
      <ActionButton onClick={handleComment}>Comment</ActionButton>
      <ActionButton onClick={handleShare}>Share</ActionButton>
    </BlogContainer>
  );
};

export default Blog;
