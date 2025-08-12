import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes
//  valid JWT token in the Authorization header
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; //check for Authorization header 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
