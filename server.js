const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Import the database connection
const db = require('./config/connection');

// Define routes
app.use('/api', require('./routes/user-routes'));
app.use('/api', require('./routes/thought-routes'));
app.use('/api', require('./routes/reaction-routes'));

// Start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

