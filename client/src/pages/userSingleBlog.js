import React, { useState, useEffect } from 'react';
import { likeBlog, unlikeBlog, getAllComments, commentOnBlog, shareBlog } from '../services/api';

const UserSingleBlog = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(blog.likes.length);
  const [totalComments, setTotalComments] = useState(blog.comments.length);
  const [comments, setComments] = useState([]);

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
      // You might want to update the local state or refetch blogs after sharing
    } catch (error) {
      console.error('Error sharing blog:', error);
    }
  };

  return (
    <div>
      <h2>
        <a href={`/blogs/${blog._id}`}>{blog.title}</a>
      </h2>
      <p>{blog.content}</p>
      {blog.url && <img src={blog.url} alt={blog.title} />}
      <p>{blog.description}</p>
      <p>Total Likes: {totalLikes}</p>
      <p>Total Comments: {totalComments}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
      <button onClick={handleComment}>Comment</button>
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default UserSingleBlog;
