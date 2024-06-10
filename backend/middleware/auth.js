const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization header:', authHeader);

  if (!authHeader) {
      console.log('No authorization header provided');
      return res.status(401).send({ error: 'Access denied, no token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Extracted token:', token);

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
          console.log('User not found for token');
          throw new Error('User not found');
      }

      req.token = token;
      req.user = user;
      console.log('Authenticated user:', user);
      next();
  } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).send({ error: 'Invalid token.' });
  }
};



module.exports = auth;
