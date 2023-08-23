import axios from 'axios';

const API_BASE_URL = 'https://blog-app-qu25.onrender.com/'; // API's base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleApiError = (error) => {
  let errorMessage = 'An error occurred. Please try again later.';

  if (error.response) {
    // The request was made and the server responded with a status code
    errorMessage = error.response.data.message || errorMessage;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response from the server. Please check your connection.';
  }

  alert(errorMessage);
};

// Set the default Authorization header for authenticated requests
api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `${authToken}`;
  }
  return config;
});

// Authentication endpoints
export const registerUser = (userData) => api.post('/auth/register', userData).catch(handleApiError);
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    const { token, isAdmin } = response.data;
    
    // Save token and isAdmin to local storage or state
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAdmin', isAdmin);

    api.defaults.headers.common['Authorization'] = `${token}`;
    
    return { token, isAdmin };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Blog endpoints
export const createBlog = async (blogData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authorization token is missing');
    }
    
    const response = await api.post('/blogs', blogData, {
      headers: { Authorization: `${authToken}` }
    });
    
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getAllBlogs = () => api.get('/blogs').catch(handleApiError);
export const getBlogById = (blogId) => api.get(`/blogs/${blogId}`).catch(handleApiError);

export const updateBlogById = async (blogId, blogData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authorization token is missing');
    }
    
    const response = await api.put(`/blogs/${blogId}`, blogData, {
      headers: { Authorization: `${authToken}` }
    });
    
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteBlogById = async (blogId) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('Authorization token is missing');
    }
    
    const response = await api.delete(`/blogs/${blogId}`, {
      headers: { Authorization: `${authToken}` }
    });
    
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// User endpoints
export const likeBlog = (blogId) => api.post(`/users/${blogId}/like`).catch(handleApiError);
export const unlikeBlog = (blogId) => api.post(`/users/${blogId}/unlike`).catch(handleApiError);
export const commentOnBlog = (blogId, commentData) => api.post(`/users/${blogId}/comment`, commentData).catch(handleApiError);
export const getAllComments = (blogId) => api.get(`/users/${blogId}/comments`).catch(handleApiError);
export const shareBlog = (blogId) => api.post(`/users/${blogId}/share`).catch(handleApiError);

export default api;
