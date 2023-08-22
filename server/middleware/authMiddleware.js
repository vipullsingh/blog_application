const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const User = require('../models/User');

// Middleware function for JWT authentication
const authMiddleware = async (req, res, next) => {
  
  const token = req.header('Authorization');
  console.log(token)
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      req.user = user;
      req.isAdmin = user.isAdmin;  // Set the isAdmin property
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  

module.exports = authMiddleware;