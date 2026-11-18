const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  const user = await User.findById(payload.id).select('-passwordHash');
  if (!user) {
    return res.status(401).json({ error: 'Account no longer exists.' });
  }

  req.user = user; 
  next();
};

exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'You do not have permission to do this.' });
  }
  next();
};