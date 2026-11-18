const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const adminExists = await User.findOne({ role: 'admin' });
  if (adminExists) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name: 'Admin', email, passwordHash, role: 'admin' });
  console.log('First admin account created:', email);
};