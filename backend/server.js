require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(seedAdmin)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });