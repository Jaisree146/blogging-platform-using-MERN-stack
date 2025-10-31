import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  console.log('Authorization header:', auth);
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  console.log('Extracted token:', token ? 'Token present' : 'No token');
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully, userId:', decoded.id);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}

export async function requireAdmin(_req, res, next) {
  // Placeholder for role checks if needed later
  next();
}
