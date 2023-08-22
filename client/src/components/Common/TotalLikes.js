// components/Common/TotalLikes.js

import React, { useState, useEffect } from 'react';
import { getTotalLikes } from '../../services/api';

const TotalLikes = ({ blogId }) => {
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const fetchTotalLikes = async () => {
      try {
        const response = await getTotalLikes(blogId);
        setTotalLikes(response.data.totalLikes);
      } catch (error) {
        console.error('Error fetching total likes:', error);
      }
    };

    fetchTotalLikes();
  }, [blogId]);

  return <p>Total Likes: {totalLikes}</p>;
};

export default TotalLikes;
