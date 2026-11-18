const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

router.get('/admin-check', authenticate, requireRole('admin'), (req, res) => {
  res.json({ message: 'Hello admin' });
});

module.exports = router;